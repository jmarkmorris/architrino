#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULTS = {
  steps: 800,
  dt: 0.01,
  stride: 10,
  particles: 6,
  radius: 1,
  radialSpeed: 0,
  tangentialSpeed: 0.55,
  driftX: 0.035,
  driftY: -0.018,
  cf: 1,
  kappa: 0.02,
  selfHitGain: 0.35,
  softening: 0.08,
  jacobianFloor: 0.08,
  maxAcceleration: 18,
  shellK: 0.35,
  shellRadius: 1,
  minDelay: 0.035,
  memoryDepth: 4,
  historyMode: "adaptive",
  historyMargin: 1,
  historySafetyFactor: 2,
  historyMaxDepth: 0,
  rootHaltPolicy: "partner",
  out: null,
  csv: null,
  svg: null,
  pretty: false,
};

const COLORS = ["#0b6bcb", "#c2410c", "#0f766e", "#7c3aed", "#be123c", "#ca8a04"];

function parseArgs(argv) {
  const args = { ...DEFAULTS, help: false };
  const numberKeys = new Set([
    "steps",
    "dt",
    "stride",
    "particles",
    "radius",
    "radialSpeed",
    "tangentialSpeed",
    "driftX",
    "driftY",
    "cf",
    "kappa",
    "selfHitGain",
    "softening",
    "jacobianFloor",
    "maxAcceleration",
    "shellK",
    "shellRadius",
    "minDelay",
    "memoryDepth",
    "historyMargin",
    "historySafetyFactor",
    "historyMaxDepth",
  ]);

  for (let i = 0; i < argv.length; i += 1) {
    const raw = argv[i];
    if (raw === "--help" || raw === "-h") {
      args.help = true;
      continue;
    }
    if (!raw.startsWith("--")) {
      throw new Error(`Unknown positional argument: ${raw}`);
    }

    const key = raw.slice(2).replaceAll("-", "");
    const canonicalKey = optionKey(key);
    if (canonicalKey === "pretty") {
      args.pretty = true;
      continue;
    }
    if (!(canonicalKey in args)) {
      throw new Error(`Unknown option: ${raw}`);
    }
    if (i + 1 >= argv.length) {
      throw new Error(`Missing value for ${raw}`);
    }
    const value = argv[++i];
    args[canonicalKey] = numberKeys.has(canonicalKey) ? finiteNumber(value, raw) : value;
  }

  args.steps = positiveInteger(args.steps, "--steps");
  args.stride = positiveInteger(args.stride, "--stride");
  args.particles = positiveInteger(args.particles, "--particles");
  if (args.particles < 2) {
    throw new Error("--particles must be at least 2.");
  }
  for (const key of ["dt", "radius", "cf", "jacobianFloor", "memoryDepth", "historySafetyFactor"]) {
    if (args[key] <= 0) {
      throw new Error(`--${kebabCase(key)} must be positive.`);
    }
  }
  for (const key of ["kappa", "selfHitGain", "softening", "maxAcceleration", "shellK", "shellRadius", "minDelay", "historyMargin", "historyMaxDepth"]) {
    if (args[key] < 0) {
      throw new Error(`--${kebabCase(key)} must be nonnegative.`);
    }
  }
  validateHistoryMode(args.historyMode);
  validateRootHaltPolicy(args.rootHaltPolicy);
  return args;
}

function optionKey(key) {
  const aliases = {
    cf: "cf",
    csv: "csv",
    dt: "dt",
    out: "out",
    svg: "svg",
    help: "help",
    pretty: "pretty",
    steps: "steps",
    stride: "stride",
    particles: "particles",
    radius: "radius",
    radialspeed: "radialSpeed",
    tangentialspeed: "tangentialSpeed",
    driftx: "driftX",
    drifty: "driftY",
    kappa: "kappa",
    selfhitgain: "selfHitGain",
    softening: "softening",
    jacobianfloor: "jacobianFloor",
    maxacceleration: "maxAcceleration",
    shellk: "shellK",
    shellradius: "shellRadius",
    mindelay: "minDelay",
    memorydepth: "memoryDepth",
    historymode: "historyMode",
    historymargin: "historyMargin",
    historysafetyfactor: "historySafetyFactor",
    historymaxdepth: "historyMaxDepth",
    roothaltpolicy: "rootHaltPolicy",
  };
  return aliases[key] ?? key;
}

function kebabCase(key) {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function positiveInteger(value, label) {
  const number = finiteNumber(value, label);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`${label} must be a positive integer.`);
  }
  return number;
}

function validateRootHaltPolicy(policy) {
  if (!["partner", "all", "none"].includes(policy)) {
    throw new Error("--root-halt-policy must be one of: partner, all, none.");
  }
}

function validateHistoryMode(mode) {
  if (!["deep", "adaptive", "fixed"].includes(mode)) {
    throw new Error("--history-mode must be one of: deep, adaptive, fixed.");
  }
}

function printHelp() {
  console.log(`Usage: node scripts/simulations/assembly-dynamics-toy.mjs [options]

Options:
  --steps N              Integration steps. Default: ${DEFAULTS.steps}
  --dt X                 Absolute-time step. Default: ${DEFAULTS.dt}
  --stride N             Store one frame every N steps. Default: ${DEFAULTS.stride}
  --particles N          Ring particles with alternating polarity. Default: ${DEFAULTS.particles}
  --radius X             Initial ring radius. Default: ${DEFAULTS.radius}
  --radial-speed X       Initial radial speed; negative means inward. Default: ${DEFAULTS.radialSpeed}
  --tangential-speed X   Initial internal tangential speed. Default: ${DEFAULTS.tangentialSpeed}
  --drift-x X            Initial assembly-center x velocity. Default: ${DEFAULTS.driftX}
  --drift-y X            Initial assembly-center y velocity. Default: ${DEFAULTS.driftY}
  --cf X                 Field speed c_f. Default: ${DEFAULTS.cf}
  --kappa X              Delayed-hit coupling. Default: ${DEFAULTS.kappa}
  --self-hit-gain X      Same-source contribution multiplier. Default: ${DEFAULTS.selfHitGain}
  --softening X          Distance softening eta; use 0 to disable. Default: ${DEFAULTS.softening}
  --jacobian-floor X     Minimum |J| used in the regularized hit weight. Default: ${DEFAULTS.jacobianFloor}
  --max-acceleration X   Per-particle acceleration cap. Default: ${DEFAULTS.maxAcceleration}
  --shell-k X            Toy shell-radius restoring coefficient. Default: ${DEFAULTS.shellK}
  --shell-radius X       Target shell radius for the toy restoring term. Default: ${DEFAULTS.shellRadius}
  --min-delay X          Minimum accepted same-source causal delay. Partner roots may use zero delay. Default: ${DEFAULTS.minDelay}
  --memory-depth X       Initial negative-time rotating-ring history depth; fixed-mode buffer depth. Default: ${DEFAULTS.memoryDepth}
  --history-mode X       Retained causal history: deep, adaptive, fixed. Default: ${DEFAULTS.historyMode}
  --history-margin X     Extra seconds retained beyond the adaptive causal-delay estimate. Default: ${DEFAULTS.historyMargin}
  --history-safety-factor X
                          Multiplier on current pairwise light-delay estimate in adaptive mode. Default: ${DEFAULTS.historySafetyFactor}
  --history-max-depth X  Optional cap on retained history depth; 0 means uncapped. Default: ${DEFAULTS.historyMaxDepth}
  --root-halt-policy X   Halt on unresolved roots: partner, all, none. Default: ${DEFAULTS.rootHaltPolicy}
  --out PATH             Write JSON output instead of stdout.
  --csv PATH             Write sampled frames as CSV.
  --svg PATH             Write a trajectory SVG.
  --pretty               Pretty-print JSON.
  --help                 Show this help.

This is a visualization-first toy model. It assumes the Master EOM exists,
uses an adaptive/deep delayed causal-root lookup, and reports diagnostics instead of
claiming proof closure or a certified branch chart.`);
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

function mul(a, scalar) {
  return [a[0] * scalar, a[1] * scalar];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function crossZ(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

function norm(a) {
  return Math.hypot(a[0], a[1]);
}

function clampVector(v, maxNorm) {
  const length = norm(v);
  if (length <= maxNorm || length === 0) {
    return v;
  }
  return mul(v, maxNorm / length);
}

function lerp(a, b, u) {
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
}

function cloneState(state) {
  return {
    t: state.t,
    positions: state.positions.map((p) => [...p]),
    velocities: state.velocities.map((v) => [...v]),
  };
}

function initialState(config) {
  const positions = [];
  const velocities = [];
  const drift = [config.driftX, config.driftY];

  for (let i = 0; i < config.particles; i += 1) {
    const theta = (2 * Math.PI * i) / config.particles;
    const radial = [Math.cos(theta), Math.sin(theta)];
    const tangent = [-Math.sin(theta), Math.cos(theta)];
    positions.push(mul(radial, config.radius));
    velocities.push(add(add(drift, mul(radial, config.radialSpeed)), mul(tangent, config.tangentialSpeed)));
  }

  return { t: 0, positions, velocities };
}

function polarities(count) {
  return Array.from({ length: count }, (_, i) => (i % 2 === 0 ? 1 : -1));
}

function buildInitialHistory(state, config) {
  const history = [];
  const frames = Math.ceil(config.memoryDepth / config.dt);
  for (let k = frames; k >= 1; k -= 1) {
    const t = -k * config.dt;
    history.push(rotatingRingFrame(t, config));
  }
  history.push(cloneState(state));
  return history;
}

function maxPairDistance(positions) {
  let maxDistance = 0;
  for (let i = 0; i < positions.length; i += 1) {
    for (let j = 0; j < positions.length; j += 1) {
      maxDistance = Math.max(maxDistance, norm(sub(positions[i], positions[j])));
    }
  }
  return maxDistance;
}

function adaptiveHistoryDepth(state, config) {
  const pairLightDelay = maxPairDistance(state.positions) / config.cf;
  return Math.max(
    config.memoryDepth,
    config.minDelay,
    pairLightDelay * config.historySafetyFactor + config.historyMargin + config.dt
  );
}

function targetHistoryDepth(state, config) {
  if (config.historyMode === "fixed") {
    return config.memoryDepth;
  }
  const adaptiveDepth = adaptiveHistoryDepth(state, config);
  if (config.historyMaxDepth > 0) {
    return Math.min(adaptiveDepth, config.historyMaxDepth);
  }
  return adaptiveDepth;
}

function extendPrehistory(history, earliestTime, config) {
  while (history[0].t > earliestTime) {
    const t = history[0].t - config.dt;
    history.unshift(rotatingRingFrame(t, config));
  }
}

function prepareHistoryForSearch(history, state, config) {
  if (config.historyMode === "fixed") {
    return;
  }
  const targetDepth = targetHistoryDepth(state, config);
  extendPrehistory(history, state.t - targetDepth - config.dt, config);
}

function maintainHistory(history, state, config) {
  if (config.historyMode === "deep" && config.historyMaxDepth <= 0) {
    return;
  }
  const targetDepth = config.historyMode === "deep" ? config.historyMaxDepth : targetHistoryDepth(state, config);
  trimHistory(history, state.t - targetDepth - config.dt);
}

function rotatingRingFrame(t, config) {
  const positions = [];
  const velocities = [];
  const drift = [config.driftX, config.driftY];
  const center = mul(drift, t);
  const omega = config.tangentialSpeed / config.radius;
  const radius = Math.max(config.radius + config.radialSpeed * t, config.softening);

  for (let i = 0; i < config.particles; i += 1) {
    const theta0 = (2 * Math.PI * i) / config.particles;
    const theta = theta0 + omega * t;
    const radial = [Math.cos(theta), Math.sin(theta)];
    const tangent = [-Math.sin(theta), Math.cos(theta)];
    positions.push(add(center, mul(radial, radius)));
    velocities.push(add(add(drift, mul(radial, config.radialSpeed)), mul(tangent, config.tangentialSpeed)));
  }

  return { t, positions, velocities };
}

function centerOfPositions(positions) {
  const sum = positions.reduce((acc, position) => add(acc, position), [0, 0]);
  return mul(sum, 1 / positions.length);
}

function centerOfVelocities(velocities) {
  const sum = velocities.reduce((acc, velocity) => add(acc, velocity), [0, 0]);
  return mul(sum, 1 / velocities.length);
}

function frameDiagnostics(state, config, charges, hitStats = null) {
  const center = centerOfPositions(state.positions);
  const centerVelocity = centerOfVelocities(state.velocities);
  const particles = state.positions.map((position, i) => {
    const relative = sub(position, center);
    const velocityRelative = sub(state.velocities[i], centerVelocity);
    const r2 = dot(relative, relative);
    return {
      id: i,
      q: charges[i],
      x: position[0],
      y: position[1],
      vx: state.velocities[i][0],
      vy: state.velocities[i][1],
      phase: Math.atan2(relative[1], relative[0]),
      radial_velocity: r2 > 0 ? dot(relative, velocityRelative) / Math.sqrt(r2) : 0,
      angular_velocity: r2 > 0 ? crossZ(relative, velocityRelative) / r2 : 0,
    };
  });

  const radiusSquaredMean =
    particles.reduce((sum, particle) => {
      const relative = [particle.x - center[0], particle.y - center[1]];
      return sum + dot(relative, relative);
    }, 0) / particles.length;

  return {
    t: state.t,
    center,
    center_velocity: centerVelocity,
    shell_radius: Math.sqrt(radiusSquaredMean),
    conserved_quantities: conservedQuantities(state, config, charges),
    hit_stats: hitStats,
    particles,
  };
}

function conservedQuantities(state, config, charges) {
  const center = centerOfPositions(state.positions);
  const centerVelocity = centerOfVelocities(state.velocities);
  const kinetic = 0.5 * state.velocities.reduce((sum, velocity) => sum + dot(velocity, velocity), 0);
  let equalTimePotential = 0;

  for (let i = 0; i < state.positions.length; i += 1) {
    for (let j = i + 1; j < state.positions.length; j += 1) {
      const d = sub(state.positions[i], state.positions[j]);
      const r = Math.sqrt(dot(d, d) + config.softening ** 2);
      equalTimePotential += (config.kappa * charges[i] * charges[j]) / r;
    }
  }

  let shellPotential = 0;
  let angularMomentum = 0;
  for (let i = 0; i < state.positions.length; i += 1) {
    const relative = sub(state.positions[i], center);
    const velocityRelative = sub(state.velocities[i], centerVelocity);
    const radial = norm(relative);
    shellPotential += 0.5 * config.shellK * (radial - config.shellRadius) ** 2;
    angularMomentum += crossZ(relative, velocityRelative);
  }

  const momentum = state.velocities.reduce((sum, velocity) => add(sum, velocity), [0, 0]);
  return {
    kinetic,
    equal_time_potential_proxy: equalTimePotential,
    shell_potential_proxy: shellPotential,
    energy_proxy: kinetic + equalTimePotential + shellPotential,
    momentum,
    angular_momentum_z: angularMomentum,
  };
}

function sourceAtFrame(frame, sourceId) {
  return {
    t: frame.t,
    position: frame.positions[sourceId],
    velocity: frame.velocities[sourceId],
  };
}

function causalResidual(receiverPosition, sourceSample, t, cf) {
  return norm(sub(receiverPosition, sourceSample.position)) - cf * (t - sourceSample.t);
}

function interpolateSource(newer, older, sourceId, u) {
  return {
    t: newer.t + (older.t - newer.t) * u,
    position: lerp(newer.positions[sourceId], older.positions[sourceId], u),
    velocity: lerp(newer.velocities[sourceId], older.velocities[sourceId], u),
  };
}

function findMostRecentRoot(history, receiverPosition, receiverId, sourceId, t, config) {
  let lastNewerResidual = null;
  let oldestResidual = null;
  let oldestDelay = null;
  const minAcceptedDelay = minimumAcceptedRootDelay(receiverId, sourceId, config);
  const historyOldest = history[0];
  const historyNewest = history[history.length - 1];
  for (let k = history.length - 1; k >= 1; k -= 1) {
    const newer = history[k];
    const older = history[k - 1];
    const newerDelay = t - newer.t;
    const olderDelay = t - older.t;
    if (newerDelay < minAcceptedDelay && olderDelay < minAcceptedDelay) {
      continue;
    }

    const newerSource = sourceAtFrame(newer, sourceId);
    const olderSource = sourceAtFrame(older, sourceId);
    const gNew = causalResidual(receiverPosition, newerSource, t, config.cf);
    const gOld = causalResidual(receiverPosition, olderSource, t, config.cf);
    lastNewerResidual = gNew;
    oldestResidual = gOld;
    oldestDelay = olderDelay;

    if (Math.abs(gNew) < 1e-12 && newerDelay >= minAcceptedDelay) {
      return {
        ...newerSource,
        delay: newerDelay,
        residual: gNew,
        bracket_residuals: [gNew, gOld],
      };
    }

    if (gNew === gOld) {
      continue;
    }

    if ((gNew > 0 && gOld <= 0) || (gNew < 0 && gOld >= 0)) {
      const u = gNew / (gNew - gOld);
      const source = interpolateSource(newer, older, sourceId, u);
      const delay = t - source.t;
      if (delay < minAcceptedDelay) {
        continue;
      }
      return {
        ...source,
        delay,
        residual: causalResidual(receiverPosition, source, t, config.cf),
        bracket_residuals: [gNew, gOld],
      };
    }
  }

  if (lastNewerResidual === null) {
    return {
      unresolved: true,
      reason: "insufficient_history_after_min_delay",
      min_accepted_delay: minAcceptedDelay,
      history_oldest_t: historyOldest?.t ?? null,
      history_newest_t: historyNewest?.t ?? null,
      history_frame_count: history.length,
    };
  }
  return {
    unresolved: true,
    reason: oldestResidual !== null && oldestResidual > 0 ? "history_exhausted" : "unbracketed_root",
    residual: lastNewerResidual,
    oldest_residual: oldestResidual,
    oldest_delay: oldestDelay,
    min_accepted_delay: minAcceptedDelay,
    history_oldest_t: historyOldest?.t ?? null,
    history_newest_t: historyNewest?.t ?? null,
    history_frame_count: history.length,
  };
}

function minimumAcceptedRootDelay(receiverId, sourceId, config) {
  return receiverId === sourceId ? config.minDelay : 0;
}

function shouldHaltForUnresolvedRoot(config, receiverId, sourceId) {
  if (config.rootHaltPolicy === "none") {
    return false;
  }
  if (config.rootHaltPolicy === "all") {
    return true;
  }
  return receiverId !== sourceId;
}

function accelerations(state, history, config, charges) {
  const acc = state.positions.map(() => [0, 0]);
  const center = centerOfPositions(state.positions);
  const hitStats = {
    partner_hits: 0,
    self_hits: 0,
    unresolved_roots: 0,
    partner_unresolved_roots: 0,
    self_unresolved_roots: 0,
    first_unresolved_root: null,
    root_failure_reasons: {},
    partner_root_failure_reasons: {},
    self_root_failure_reasons: {},
    min_abs_jacobian: null,
    max_hit_weight: 0,
  };
  const unresolvedRequiredRoots = [];

  for (let i = 0; i < state.positions.length; i += 1) {
    for (let j = 0; j < state.positions.length; j += 1) {
      const root = findMostRecentRoot(history, state.positions[i], i, j, state.t, config);
      if (!root || root.unresolved) {
        hitStats.unresolved_roots += 1;
        const detail = {
          receiver_id: i,
          source_id: j,
          root_kind: i === j ? "self" : "partner",
          reason: root?.reason ?? "unresolved_root",
          residual: root?.residual ?? null,
          oldest_residual: root?.oldest_residual ?? null,
          oldest_delay: root?.oldest_delay ?? null,
          min_accepted_delay: root?.min_accepted_delay ?? minimumAcceptedRootDelay(i, j, config),
          history_oldest_t: root?.history_oldest_t ?? null,
          history_newest_t: root?.history_newest_t ?? null,
          history_frame_count: root?.history_frame_count ?? history.length,
        };
        incrementCount(hitStats.root_failure_reasons, detail.reason);
        if (i === j) {
          hitStats.self_unresolved_roots += 1;
          incrementCount(hitStats.self_root_failure_reasons, detail.reason);
        } else {
          hitStats.partner_unresolved_roots += 1;
          incrementCount(hitStats.partner_root_failure_reasons, detail.reason);
        }
        if (!hitStats.first_unresolved_root) {
          hitStats.first_unresolved_root = detail;
        }
        if (shouldHaltForUnresolvedRoot(config, i, j)) {
          unresolvedRequiredRoots.push(detail);
        }
        continue;
      }

      const displacement = sub(state.positions[i], root.position);
      const distance = norm(displacement);
      if (distance <= 1e-12) {
        continue;
      }
      const unit = mul(displacement, 1 / distance);
      const jacobian = 1 - dot(root.velocity, unit) / config.cf;
      const absJacobian = Math.abs(jacobian);
      const weight = 1 / Math.max(absJacobian, config.jacobianFloor);
      const softenedDistanceSquared = distance ** 2 + config.softening ** 2;
      const sourceGain = i === j ? config.selfHitGain : 1;
      const gain = (config.kappa * charges[i] * charges[j] * sourceGain * weight) /
        softenedDistanceSquared;
      acc[i] = add(acc[i], mul(unit, gain));

      if (i === j) {
        hitStats.self_hits += 1;
      } else {
        hitStats.partner_hits += 1;
      }
      hitStats.min_abs_jacobian =
        hitStats.min_abs_jacobian === null ? absJacobian : Math.min(hitStats.min_abs_jacobian, absJacobian);
      hitStats.max_hit_weight = Math.max(hitStats.max_hit_weight, weight);
    }
  }

  if (config.shellK > 0) {
    for (let i = 0; i < state.positions.length; i += 1) {
      const relative = sub(state.positions[i], center);
      const radial = norm(relative);
      if (radial > 1e-12) {
        const shellMagnitude = -config.shellK * (radial - config.shellRadius);
        acc[i] = add(acc[i], mul(relative, shellMagnitude / radial));
      }
    }
  }

  return {
    accelerations: acc.map((a) => clampVector(a, config.maxAcceleration)),
    hitStats,
    halt: unresolvedRequiredRoots.length > 0
      ? {
          code: "UNRESOLVED_CAUSAL_ROOT",
          unresolved_roots: unresolvedRequiredRoots,
        }
      : null,
  };
}

function step(state, history, config, charges) {
  prepareHistoryForSearch(history, state, config);
  const before = accelerations(state, history, config, charges);
  if (before.halt) {
    return { state, hitStats: before.hitStats, halt: before.halt };
  }
  const predicted = {
    t: state.t + config.dt,
    positions: state.positions.map((position, i) =>
      add(add(position, mul(state.velocities[i], config.dt)), mul(before.accelerations[i], 0.5 * config.dt ** 2))
    ),
    velocities: state.velocities.map((velocity, i) =>
      add(velocity, mul(before.accelerations[i], config.dt))
    ),
  };

  history.push(cloneState(predicted));
  maintainHistory(history, predicted, config);

  return { state: predicted, hitStats: before.hitStats };
}

function trimHistory(history, oldestTime) {
  while (history.length > 2 && history[1].t < oldestTime) {
    history.shift();
  }
}

function incrementCount(counts, key) {
  counts[key] = (counts[key] ?? 0) + 1;
}

function summarizeDrift(initial, final) {
  const i = initial.conserved_quantities;
  const f = final.conserved_quantities;
  return {
    delta_shell_radius: final.shell_radius - initial.shell_radius,
    delta_energy_proxy: f.energy_proxy - i.energy_proxy,
    delta_momentum_norm: norm(sub(f.momentum, i.momentum)),
    delta_angular_momentum_z: f.angular_momentum_z - i.angular_momentum_z,
  };
}

export function run(inputConfig = {}) {
  const config = { ...DEFAULTS, ...inputConfig };
  validateHistoryMode(config.historyMode);
  validateRootHaltPolicy(config.rootHaltPolicy);
  let state = initialState(config);
  const charges = polarities(config.particles);
  const history = buildInitialHistory(state, config);
  const frames = [];
  const initialFrame = frameDiagnostics(state, config, charges, null);
  frames.push(initialFrame);
  let latestHitStats = null;
  let error = null;
  const aggregateHitStats = {
    steps: 0,
    total_partner_hits: 0,
    total_self_hits: 0,
    total_unresolved_roots: 0,
    total_partner_unresolved_roots: 0,
    total_self_unresolved_roots: 0,
    root_failure_reasons: {},
    partner_root_failure_reasons: {},
    self_root_failure_reasons: {},
    steps_with_self_hits: 0,
    min_abs_jacobian: null,
    max_hit_weight: 0,
  };

  for (let n = 1; n <= config.steps; n += 1) {
    const result = step(state, history, config, charges);
    latestHitStats = result.hitStats;
    updateAggregateHitStats(aggregateHitStats, latestHitStats);
    if (result.halt) {
      error = {
        code: result.halt.code,
        message: `Simulation halted at t=${state.t}: unresolved required causal root under rootHaltPolicy=${config.rootHaltPolicy}.`,
        t: state.t,
        attempted_step: n,
        root_halt_policy: config.rootHaltPolicy,
        unresolved_roots: result.halt.unresolved_roots,
      };
      const haltedFrame = frameDiagnostics(state, config, charges, latestHitStats);
      if (frames[frames.length - 1]?.t === haltedFrame.t) {
        frames[frames.length - 1] = haltedFrame;
      } else {
        frames.push(haltedFrame);
      }
      break;
    }
    state = result.state;
    if (n % config.stride === 0 || n === config.steps) {
      frames.push(frameDiagnostics(state, config, charges, latestHitStats));
    }
  }

  const finalFrame = frames[frames.length - 1];
  return {
    model: {
      name: "assembly-dynamics-toy",
      assumption: "EOM=true; this script uses a regularized adaptive/deep-history branch-sum surrogate.",
      limitations: [
        "No certified branch chart.",
        "Only the most recent causal root per source-receiver pair is retained.",
        "Unresolved root diagnostics mean the finite history search did not resolve a branch; they are numerical-search failures, not physics events.",
        "Negative-time history is initialized as a rotating ring with optional radial speed, then replaced by simulated history.",
        "The shell-radius term is a toy assembly-level response used for visualization stability.",
        "The reported conserved quantities are diagnostics, not exact conserved theorem objects.",
      ],
      variables: {
        "x_i(t)": "2D architrino position",
        "v_i(t)": "2D absolute-time velocity",
        "q_i": "polarity bookkeeping value, alternating +1 and -1",
        "phi_i(t)": "phase angle around the assembly center",
        "R_shell(t)": "root-mean-square shell radius around the assembly center",
        "v_r": "initial radial speed; negative means inward toward the assembly center",
        "J_ij": "regularized causal-delay Jacobian, 1 - v_j(t0) dot rhat_ij / c_f",
      },
      equations: [
        "g_ij(t,t0) = ||x_i(t) - x_j(t0)|| - c_f (t - t0) = 0",
        "a_ij = kappa q_i q_j rhat_ij / ((r_ij^2 + eta^2) max(|J_ij|, J_floor))",
        "a_i = sum_j a_ij + a_shell,i",
        "a_shell,i = -k_shell (||x_i-X|| - R0) (x_i-X)/||x_i-X||",
      ],
    },
    config,
    completed: error === null,
    error,
    summary: {
      status: error === null ? "completed" : "halted",
      initial: summarizeFrame(initialFrame),
      final: summarizeFrame(finalFrame),
      drift: summarizeDrift(initialFrame, finalFrame),
      aggregate_hit_stats: aggregateHitStats,
      history: summarizeHistory(history, config),
    },
    frames,
  };
}

function updateAggregateHitStats(aggregate, hitStats) {
  aggregate.steps += 1;
  aggregate.total_partner_hits += hitStats.partner_hits;
  aggregate.total_self_hits += hitStats.self_hits;
  aggregate.total_unresolved_roots += hitStats.unresolved_roots;
  aggregate.total_partner_unresolved_roots += hitStats.partner_unresolved_roots;
  aggregate.total_self_unresolved_roots += hitStats.self_unresolved_roots;
  for (const [reason, count] of Object.entries(hitStats.root_failure_reasons ?? {})) {
    aggregate.root_failure_reasons[reason] = (aggregate.root_failure_reasons[reason] ?? 0) + count;
  }
  for (const [reason, count] of Object.entries(hitStats.partner_root_failure_reasons ?? {})) {
    aggregate.partner_root_failure_reasons[reason] = (aggregate.partner_root_failure_reasons[reason] ?? 0) + count;
  }
  for (const [reason, count] of Object.entries(hitStats.self_root_failure_reasons ?? {})) {
    aggregate.self_root_failure_reasons[reason] = (aggregate.self_root_failure_reasons[reason] ?? 0) + count;
  }
  if (hitStats.self_hits > 0) {
    aggregate.steps_with_self_hits += 1;
  }
  if (hitStats.min_abs_jacobian !== null) {
    aggregate.min_abs_jacobian =
      aggregate.min_abs_jacobian === null
        ? hitStats.min_abs_jacobian
        : Math.min(aggregate.min_abs_jacobian, hitStats.min_abs_jacobian);
  }
  aggregate.max_hit_weight = Math.max(aggregate.max_hit_weight, hitStats.max_hit_weight);
}

function summarizeFrame(frame) {
  return {
    t: frame.t,
    center: frame.center,
    shell_radius: frame.shell_radius,
    conserved_quantities: frame.conserved_quantities,
    hit_stats: frame.hit_stats,
  };
}

function summarizeHistory(history, config) {
  const oldest = history[0];
  const newest = history[history.length - 1];
  return {
    mode: config.historyMode,
    frame_count: history.length,
    oldest_t: oldest?.t ?? null,
    newest_t: newest?.t ?? null,
    retained_depth: oldest && newest ? newest.t - oldest.t : null,
    initial_prehistory_depth: config.memoryDepth,
    adaptive_margin: config.historyMargin,
    adaptive_safety_factor: config.historySafetyFactor,
    max_depth: config.historyMaxDepth,
  };
}

function writeJson(result, config) {
  const json = JSON.stringify(result, null, config.pretty ? 2 : 0);
  if (config.out) {
    fs.writeFileSync(config.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

function writeCsv(result, csvPath) {
  if (!csvPath) {
    return;
  }
  const rows = [
    "t,id,q,x,y,vx,vy,phase,radial_velocity,angular_velocity,shell_radius,energy_proxy,momentum_x,momentum_y,angular_momentum_z,partner_hits,self_hits,partner_unresolved_roots,self_unresolved_roots,unresolved_roots,min_abs_jacobian",
  ];
  for (const frame of result.frames) {
    for (const particle of frame.particles) {
      rows.push(
        [
          frame.t,
          particle.id,
          particle.q,
          particle.x,
          particle.y,
          particle.vx,
          particle.vy,
          particle.phase,
          particle.radial_velocity,
          particle.angular_velocity,
          frame.shell_radius,
          frame.conserved_quantities.energy_proxy,
          frame.conserved_quantities.momentum[0],
          frame.conserved_quantities.momentum[1],
          frame.conserved_quantities.angular_momentum_z,
          frame.hit_stats?.partner_hits ?? "",
          frame.hit_stats?.self_hits ?? "",
          frame.hit_stats?.partner_unresolved_roots ?? "",
          frame.hit_stats?.self_unresolved_roots ?? "",
          frame.hit_stats?.unresolved_roots ?? "",
          frame.hit_stats?.min_abs_jacobian ?? "",
        ].join(",")
      );
    }
  }
  fs.writeFileSync(csvPath, `${rows.join("\n")}\n`);
}

export function writeSvg(result, svgPath) {
  if (!svgPath) {
    return;
  }
  const points = result.frames.flatMap((frame) => frame.particles.map((p) => [p.x, p.y]));
  const centers = result.frames.map((frame) => frame.center);
  const allPoints = points.concat(centers);
  const minX = Math.min(...allPoints.map((p) => p[0]));
  const maxX = Math.max(...allPoints.map((p) => p[0]));
  const minY = Math.min(...allPoints.map((p) => p[1]));
  const maxY = Math.max(...allPoints.map((p) => p[1]));
  const width = 900;
  const height = 700;
  const pad = 40;
  const scale = Math.min(
    (width - 2 * pad) / Math.max(maxX - minX, 1e-9),
    (height - 2 * pad) / Math.max(maxY - minY, 1e-9)
  );
  const project = ([x, y]) => [
    pad + (x - minX) * scale,
    height - pad - (y - minY) * scale,
  ];
  const pathForParticle = (id) =>
    result.frames
      .map((frame) => {
        const particle = frame.particles[id];
        const [x, y] = project([particle.x, particle.y]);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");

  const centerPath = centers
    .map((center) => {
      const [x, y] = project(center);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const final = result.frames[result.frames.length - 1];
  const finalMarks = final.particles
    .map((particle, i) => {
      const [x, y] = project([particle.x, particle.y]);
      return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="5" fill="${COLORS[i % COLORS.length]}" stroke="#111827" stroke-width="1"><title>id=${particle.id}, q=${particle.q}</title></circle>`;
    })
    .join("\n  ");

  const paths = Array.from({ length: result.config.particles }, (_, i) => {
    const color = COLORS[i % COLORS.length];
    return `<polyline points="${pathForParticle(i)}" fill="none" stroke="${color}" stroke-width="1.8" stroke-opacity="0.82"><title>particle ${i}</title></polyline>`;
  }).join("\n  ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Architrino assembly dynamics toy trajectory">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="24" y="32" font-family="system-ui, sans-serif" font-size="18" fill="#111827">Assembly dynamics toy: delayed causal-root branch-sum surrogate</text>
  <text x="24" y="56" font-family="system-ui, sans-serif" font-size="12" fill="#475569">status=${result.summary.status}, final t=${final.t.toFixed(3)}, shell radius=${final.shell_radius.toFixed(4)}, energy proxy=${final.conserved_quantities.energy_proxy.toFixed(6)}</text>
  ${paths}
  <polyline points="${centerPath}" fill="none" stroke="#111827" stroke-width="2.4" stroke-dasharray="6 5"><title>assembly center</title></polyline>
  ${finalMarks}
</svg>
`;
  fs.writeFileSync(svgPath, svg);
}

export function main() {
  const config = parseArgs(process.argv.slice(2));
  if (config.help) {
    printHelp();
    return;
  }
  for (const maybePath of [config.out, config.csv, config.svg]) {
    if (maybePath) {
      fs.mkdirSync(path.dirname(path.resolve(maybePath)), { recursive: true });
    }
  }
  const result = run(config);
  writeCsv(result, config.csv);
  writeSvg(result, config.svg);
  writeJson(result, config);
  if (result.error) {
    console.error(`${result.error.code}: ${result.error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
