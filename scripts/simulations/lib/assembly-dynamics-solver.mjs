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
  jacobianFloor: 1e-9,
  maxAcceleration: 0,
  shellK: 0,
  shellRadius: 1,
  minDelay: 0.035,
  singularityTolerance: 1e-12,
  rootTolerance: 1e-12,
  memoryDepth: 4,
  historyMode: "adaptive",
  historyMargin: 1,
  historySafetyFactor: 2,
  historyMaxDepth: 0,
  rootHaltPolicy: "all",
  out: null,
  csv: null,
  svg: null,
  pretty: false,
};

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
  const radius = Math.max(config.radius + config.radialSpeed * t, 0);

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
      const r = Math.sqrt(dot(d, d));
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

function residualSign(value, tolerance) {
  if (Math.abs(value) <= tolerance) {
    return 0;
  }
  return value > 0 ? 1 : -1;
}

function addUniqueRoot(roots, root, config) {
  const duplicate = roots.some((existing) => Math.abs(existing.t - root.t) <= Math.max(config.rootTolerance, 1e-14));
  if (!duplicate) {
    roots.push(root);
  }
}

function clippedNewerSource(newer, older, sourceId, t, minAcceptedDelay) {
  const newerDelay = t - newer.t;
  if (newerDelay >= minAcceptedDelay) {
    return sourceAtFrame(newer, sourceId);
  }
  const targetT = t - minAcceptedDelay;
  if (targetT < older.t || targetT > newer.t) {
    return null;
  }
  const span = older.t - newer.t;
  const u = span === 0 ? 0 : (targetT - newer.t) / span;
  return interpolateSource(newer, older, sourceId, u);
}

function findCausalRoots(history, receiverPosition, receiverId, sourceId, t, config) {
  const roots = [];
  const failures = [];
  let newestResidual = null;
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

    const newerSource = clippedNewerSource(newer, older, sourceId, t, minAcceptedDelay);
    if (!newerSource) {
      continue;
    }
    const olderSource = sourceAtFrame(older, sourceId);
    const gNew = causalResidual(receiverPosition, newerSource, t, config.cf);
    const gOld = causalResidual(receiverPosition, olderSource, t, config.cf);
    newestResidual = gNew;
    oldestResidual = gOld;
    oldestDelay = olderDelay;
    const newSign = residualSign(gNew, config.rootTolerance);
    const oldSign = residualSign(gOld, config.rootTolerance);

    if (newSign === 0 && oldSign === 0) {
      failures.push({
        reason: "degenerate_causal_root_interval",
        min_accepted_delay: minAcceptedDelay,
        residual: gNew,
        history_oldest_t: historyOldest?.t ?? null,
        history_newest_t: historyNewest?.t ?? null,
        history_frame_count: history.length,
      });
      continue;
    }

    if (newSign === 0) {
      addUniqueRoot(roots, {
        ...newerSource,
        delay: t - newerSource.t,
        residual: gNew,
        bracket_residuals: [gNew, gOld],
      }, config);
    }

    if (oldSign === 0) {
      addUniqueRoot(roots, {
        ...olderSource,
        delay: olderDelay,
        residual: gOld,
        bracket_residuals: [gNew, gOld],
      }, config);
    }

    if (newSign === 0 || oldSign === 0) {
      continue;
    }

    if (newSign !== oldSign) {
      const u = gNew / (gNew - gOld);
      const source = interpolateSource(newer, older, sourceId, u);
      const delay = t - source.t;
      if (delay < minAcceptedDelay) {
        continue;
      }
      addUniqueRoot(roots, {
        ...source,
        delay,
        residual: causalResidual(receiverPosition, source, t, config.cf),
        bracket_residuals: [gNew, gOld],
      }, config);
    }
  }

  if (roots.length > 0 || failures.length > 0) {
    roots.sort((a, b) => b.t - a.t);
    return { roots, failures };
  }

  if (newestResidual === null) {
    failures.push({
      reason: "insufficient_history_after_min_delay",
      min_accepted_delay: minAcceptedDelay,
      history_oldest_t: historyOldest?.t ?? null,
      history_newest_t: historyNewest?.t ?? null,
      history_frame_count: history.length,
    });
    return { roots, failures };
  }

  if (oldestResidual !== null && oldestResidual > config.rootTolerance) {
    failures.push({
      reason: "history_exhausted",
      residual: newestResidual,
      oldest_residual: oldestResidual,
      oldest_delay: oldestDelay,
      min_accepted_delay: minAcceptedDelay,
      history_oldest_t: historyOldest?.t ?? null,
      history_newest_t: historyNewest?.t ?? null,
      history_frame_count: history.length,
    });
  }

  return { roots, failures };
}

function minimumAcceptedRootDelay(receiverId, sourceId, config) {
  return receiverId === sourceId ? config.minDelay : 0;
}

function shouldHaltForRequiredRoot(config, receiverId, sourceId) {
  if (config.rootHaltPolicy === "none") {
    return false;
  }
  if (config.rootHaltPolicy === "all") {
    return true;
  }
  return receiverId !== sourceId;
}

function recordRootFailure(hitStats, detail) {
  hitStats.unresolved_roots += 1;
  incrementCount(hitStats.root_failure_reasons, detail.reason);
  if (detail.root_kind === "self") {
    hitStats.self_unresolved_roots += 1;
    incrementCount(hitStats.self_root_failure_reasons, detail.reason);
  } else {
    hitStats.partner_unresolved_roots += 1;
    incrementCount(hitStats.partner_root_failure_reasons, detail.reason);
  }
  if (!hitStats.first_unresolved_root) {
    hitStats.first_unresolved_root = detail;
  }
}

function pushRequiredFailure(failures, config, detail, code) {
  if (shouldHaltForRequiredRoot(config, detail.receiver_id, detail.source_id)) {
    failures.push({ code, ...detail });
  }
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
    max_roots_per_pair: 0,
    max_abs_acceleration: 0,
  };
  const requiredFailures = [];

  for (let i = 0; i < state.positions.length; i += 1) {
    for (let j = 0; j < state.positions.length; j += 1) {
      const rootSearch = findCausalRoots(history, state.positions[i], i, j, state.t, config);
      hitStats.max_roots_per_pair = Math.max(hitStats.max_roots_per_pair, rootSearch.roots.length);

      for (const failure of rootSearch.failures) {
        const detail = {
          receiver_id: i,
          source_id: j,
          root_kind: i === j ? "self" : "partner",
          ...failure,
        };
        recordRootFailure(hitStats, detail);
        pushRequiredFailure(requiredFailures, config, detail, "UNRESOLVED_CAUSAL_ROOT");
      }

      for (const root of rootSearch.roots) {
        const displacement = sub(state.positions[i], root.position);
        const distance = norm(displacement);
        if (distance <= config.singularityTolerance) {
          const detail = {
            receiver_id: i,
            source_id: j,
            root_kind: i === j ? "self" : "partner",
            reason: "singular_causal_root",
            distance,
            singularity_tolerance: config.singularityTolerance,
            root_t: root.t,
            root_position: root.position,
            receiver_position: state.positions[i],
          };
          recordRootFailure(hitStats, detail);
          pushRequiredFailure(requiredFailures, config, detail, "SINGULAR_CAUSAL_ROOT");
          continue;
        }
        const unit = mul(displacement, 1 / distance);
        const jacobian = 1 - dot(root.velocity, unit) / config.cf;
        const absJacobian = Math.abs(jacobian);
        if (absJacobian <= config.jacobianFloor) {
          const detail = {
            receiver_id: i,
            source_id: j,
            root_kind: i === j ? "self" : "partner",
            reason: "jacobian_floor_violation",
            abs_jacobian: absJacobian,
            jacobian_floor: config.jacobianFloor,
            root_t: root.t,
            root_position: root.position,
            receiver_position: state.positions[i],
          };
          recordRootFailure(hitStats, detail);
          pushRequiredFailure(requiredFailures, config, detail, "JACOBIAN_FLOOR_VIOLATION");
          continue;
        }
        const weight = 1 / absJacobian;
        const sourceGain = i === j ? config.selfHitGain : 1;
        const gain = (config.kappa * charges[i] * charges[j] * sourceGain * weight) /
          distance ** 2;
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

  for (let i = 0; i < acc.length; i += 1) {
    const magnitude = norm(acc[i]);
    hitStats.max_abs_acceleration = Math.max(hitStats.max_abs_acceleration, magnitude);
    if (!Number.isFinite(magnitude)) {
      requiredFailures.push({
        code: "NONFINITE_ACCELERATION",
        receiver_id: i,
        source_id: null,
        root_kind: "aggregate",
        reason: "nonfinite_acceleration",
        acceleration: acc[i],
      });
    } else if (config.maxAcceleration > 0 && magnitude > config.maxAcceleration) {
      requiredFailures.push({
        code: "ACCELERATION_LIMIT_EXCEEDED",
        receiver_id: i,
        source_id: null,
        root_kind: "aggregate",
        reason: "acceleration_limit_exceeded",
        acceleration: acc[i],
        abs_acceleration: magnitude,
        max_acceleration: config.maxAcceleration,
      });
    }
  }

  return {
    accelerations: acc,
    hitStats,
    halt: requiredFailures.length > 0
      ? {
          code: requiredFailures.every((failure) => failure.code === requiredFailures[0].code)
            ? requiredFailures[0].code
            : "CAUSAL_ROOT_FAILURE",
          failures: requiredFailures,
          root_failures: requiredFailures,
          unresolved_roots: requiredFailures.filter((failure) => failure.code === "UNRESOLVED_CAUSAL_ROOT"),
        }
      : null,
  };
}

function stateIsFinite(state) {
  return Number.isFinite(state.t) &&
    state.positions.every((position) => position.every(Number.isFinite)) &&
    state.velocities.every((velocity) => velocity.every(Number.isFinite));
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

  if (!stateIsFinite(predicted)) {
    return {
      state,
      hitStats: before.hitStats,
      halt: {
        code: "NONFINITE_STATE",
        failures: [{
          code: "NONFINITE_STATE",
          reason: "nonfinite_state",
          attempted_t: predicted.t,
        }],
        root_failures: [],
        unresolved_roots: [],
      },
    };
  }

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
    max_roots_per_pair: 0,
    max_abs_acceleration: 0,
  };

  for (let n = 1; n <= config.steps; n += 1) {
    const result = step(state, history, config, charges);
    latestHitStats = result.hitStats;
    updateAggregateHitStats(aggregateHitStats, latestHitStats);
    if (result.halt) {
      error = {
        code: result.halt.code,
        message: `Simulation halted at t=${state.t}: required causal-root failure under rootHaltPolicy=${config.rootHaltPolicy}.`,
        t: state.t,
        attempted_step: n,
        root_halt_policy: config.rootHaltPolicy,
        failures: result.halt.failures,
        root_failures: result.halt.root_failures,
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
      assumption: "EOM=true; this script uses an exact branch-resolved finite-history causal-root sum where the retained branch chart stays simple.",
      limitations: [
        "No certified branch chart.",
        "All causal roots resolved inside the retained history window are summed; roots outside that window remain a finite-history failure.",
        "Unresolved root diagnostics mean the finite history search did not resolve a required branch; they are numerical-search failures, not physics events.",
        "No distance softening is applied in the pair force; arithmetic singular causal roots halt the run.",
        "The Jacobian floor is a branch-chart halt threshold, not a force denominator regularizer.",
        "The acceleration limit, when nonzero, is a halt threshold, not a force clamp.",
        "Negative-time history is initialized as a rotating ring with optional radial speed, then replaced by simulated history.",
        "The shell-radius term is not part of the Master EOM and is disabled by default.",
        "The reported conserved quantities are diagnostics, not exact conserved theorem objects.",
      ],
      variables: {
        "x_i(t)": "2D architrino position",
        "v_i(t)": "2D absolute-time velocity",
        "q_i": "polarity bookkeeping value, alternating +1 and -1",
        "phi_i(t)": "phase angle around the assembly center",
        "R_shell(t)": "root-mean-square shell radius around the assembly center",
        "v_r": "initial radial speed; negative means inward toward the assembly center",
        "J_ij": "causal-delay Jacobian, 1 - v_j(t0) dot rhat_ij / c_f",
      },
      equations: [
        "g_ij(t,t0) = ||x_i(t) - x_j(t0)|| - c_f (t - t0) = 0",
        "a_i = sum_j sum_{t0 in C_ij(t)} kappa q_i q_j rhat_ij / (r_ij^2 |J_ij|)",
        "a_i = sum_j a_ij + a_shell,i",
        "a_shell,i = -k_shell (||x_i-X|| - R0) (x_i-X)/||x_i-X||, optional and off by default",
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
  aggregate.max_roots_per_pair = Math.max(aggregate.max_roots_per_pair, hitStats.max_roots_per_pair ?? 0);
  aggregate.max_abs_acceleration = Math.max(aggregate.max_abs_acceleration, hitStats.max_abs_acceleration ?? 0);
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
