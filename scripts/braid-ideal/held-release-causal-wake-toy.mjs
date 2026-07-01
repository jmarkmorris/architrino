#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_OUTPUT_DIR = path.join(".tmp", "braid-ideal", "held-release-causal-wake-toy");

const AXIS_SITE_PAIRS = Object.freeze([
  Object.freeze(["+x", "-x"]),
  Object.freeze(["+y", "-y"]),
  Object.freeze(["+z", "-z"]),
]);

const TOY_CLOSURE_THRESHOLDS = Object.freeze({
  centerNorm: 1e-9,
  radiusStd: 1e-9,
  speedStd: 1e-9,
  pairOppositionMax: 1e-9,
  boundedRadiusMean: 2,
  boundedRadiusStd: 0.05,
  radialTurnEpsilon: 1e-9,
  radialAccelerationEpsilon: 1e-9,
});

const INITIAL_PARTICLE_PRESETS = Object.freeze({
  "face-opposite": Object.freeze({
    label: "face/opposite-face",
    decorationClass: "one positrino and one electrino on every axis",
    outputDir: DEFAULT_OUTPUT_DIR,
    particles: Object.freeze([
      Object.freeze({ id: "p_x", site: "+x", chargeType: "positrino", q: 1, position: [1, 0, 0] }),
      Object.freeze({ id: "p_y", site: "+y", chargeType: "positrino", q: 1, position: [0, 1, 0] }),
      Object.freeze({ id: "p_z", site: "+z", chargeType: "positrino", q: 1, position: [0, 0, 1] }),
      Object.freeze({ id: "e_x", site: "-x", chargeType: "electrino", q: -1, position: [-1, 0, 0] }),
      Object.freeze({ id: "e_y", site: "-y", chargeType: "electrino", q: -1, position: [0, -1, 0] }),
      Object.freeze({ id: "e_z", site: "-z", chargeType: "electrino", q: -1, position: [0, 0, -1] }),
    ]),
  }),
  "axial-paired": Object.freeze({
    label: "axial-paired",
    decorationClass: "one P/P axis, one E/E axis, and one split P/E axis",
    outputDir: path.join(".tmp", "braid-ideal", "held-release-causal-wake-toy-axial-paired"),
    particles: Object.freeze([
      Object.freeze({ id: "p_x_plus", site: "+x", chargeType: "positrino", q: 1, position: [1, 0, 0] }),
      Object.freeze({ id: "p_x_minus", site: "-x", chargeType: "positrino", q: 1, position: [-1, 0, 0] }),
      Object.freeze({ id: "p_y_plus", site: "+y", chargeType: "positrino", q: 1, position: [0, 1, 0] }),
      Object.freeze({ id: "e_y_minus", site: "-y", chargeType: "electrino", q: -1, position: [0, -1, 0] }),
      Object.freeze({ id: "e_z_plus", site: "+z", chargeType: "electrino", q: -1, position: [0, 0, 1] }),
      Object.freeze({ id: "e_z_minus", site: "-z", chargeType: "electrino", q: -1, position: [0, 0, -1] }),
    ]),
  }),
});

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printUsage(0);
}

const result = runHeldRelease(options);
writeOutputs(result, options);

console.log(JSON.stringify(createConsoleSummary(result), null, 2));

function parseArgs(rawArgs) {
  const parsed = {
    help: false,
    duration: 3,
    dt: 0.002,
    holdTime: 4,
    fieldSpeed: 1,
    coupling: 1,
    softening: 0.05,
    jacobianFloor: 0.05,
    closeRadius: 0.15,
    sampleEvery: 10,
    outputDir: null,
    preset: "face-opposite",
    causalWeight: true,
    includeSelfHits: false,
    selfHitMinDelay: null,
    maxAcceleration: Infinity,
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
    } else if (arg === "--duration") {
      parsed.duration = positiveFiniteNumber(requireNext(rawArgs, index, arg), "duration");
      index += 1;
    } else if (arg === "--dt") {
      parsed.dt = positiveFiniteNumber(requireNext(rawArgs, index, arg), "dt");
      index += 1;
    } else if (arg === "--hold-time") {
      parsed.holdTime = positiveFiniteNumber(requireNext(rawArgs, index, arg), "hold-time");
      index += 1;
    } else if (arg === "--field-speed") {
      parsed.fieldSpeed = positiveFiniteNumber(requireNext(rawArgs, index, arg), "field-speed");
      index += 1;
    } else if (arg === "--coupling") {
      parsed.coupling = finiteNumber(requireNext(rawArgs, index, arg), "coupling");
      index += 1;
    } else if (arg === "--softening") {
      parsed.softening = nonnegativeFiniteNumber(requireNext(rawArgs, index, arg), "softening");
      index += 1;
    } else if (arg === "--jacobian-floor") {
      parsed.jacobianFloor = positiveFiniteNumber(requireNext(rawArgs, index, arg), "jacobian-floor");
      index += 1;
    } else if (arg === "--close-radius") {
      parsed.closeRadius = positiveFiniteNumber(requireNext(rawArgs, index, arg), "close-radius");
      index += 1;
    } else if (arg === "--sample-every") {
      parsed.sampleEvery = positiveInteger(requireNext(rawArgs, index, arg), "sample-every");
      index += 1;
    } else if (arg === "--out") {
      parsed.outputDir = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--preset") {
      parsed.preset = requireNext(rawArgs, index, arg);
      if (!INITIAL_PARTICLE_PRESETS[parsed.preset]) {
        throw new TypeError(`--preset must be one of: ${Object.keys(INITIAL_PARTICLE_PRESETS).join(", ")}`);
      }
      index += 1;
    } else if (arg === "--max-acceleration") {
      parsed.maxAcceleration = positiveFiniteNumber(requireNext(rawArgs, index, arg), "max-acceleration");
      index += 1;
    } else if (arg === "--include-self-hits") {
      parsed.includeSelfHits = true;
    } else if (arg === "--self-hit-min-delay") {
      parsed.selfHitMinDelay = nonnegativeFiniteNumber(requireNext(rawArgs, index, arg), "self-hit-min-delay");
      index += 1;
    } else if (arg === "--no-causal-weight") {
      parsed.causalWeight = false;
    } else {
      throw new TypeError(`Unknown argument: ${arg}`);
    }
  }

  parsed.outputDir = parsed.outputDir ?? INITIAL_PARTICLE_PRESETS[parsed.preset].outputDir;
  parsed.selfHitMinDelay = parsed.selfHitMinDelay ?? parsed.dt;
  return parsed;
}

function runHeldRelease(options) {
  const preset = INITIAL_PARTICLE_PRESETS[options.preset];
  const initialParticles = preset.particles;
  const particles = initialParticles.map((particle) => ({
    ...particle,
    position: cloneVector(particle.position),
    velocity: [0, 0, 0],
  }));
  const state = {
    time: 0,
    stepIndex: 0,
    particles,
  };
  const history = [
    snapshotState(state, -options.holdTime, {
      positions: initialParticles.map((particle) => cloneVector(particle.position)),
      velocities: initialParticles.map(() => [0, 0, 0]),
    }),
    snapshotState(state),
  ];
  const frames = [sampleFrame(state, history, options, null)];
  const events = {
    firstAnyClosePass: null,
    firstOppositeClosePass: null,
    firstSamePolarityClosePass: null,
    firstFieldSpeedCrossing: null,
    firstMissingRoot: null,
    firstSmallJacobian: null,
  };
  const rootStats = {
    totalRoots: 0,
    missingRoots: 0,
    smallJacobianRoots: 0,
    maxRootsPerDirectedPair: 0,
    selfHitRoots: 0,
    missingSelfHitRoots: 0,
    selfHitDirectedPairs: 0,
    maxSelfHitRootsPerDirectedPair: 0,
    maxBranchWeight: 0,
  };
  const trajectoryAccumulator = createTrajectoryAccumulator();
  recordTrajectorySample(trajectoryAccumulator, frames[0].metrics, state);

  const totalSteps = Math.ceil(options.duration / options.dt);
  for (let step = 0; step < totalSteps; step += 1) {
    const accelerationResult = evaluateAccelerations(state, history, options);
    mergeRootStats(rootStats, accelerationResult.rootStats);
    detectRootEvents(events, accelerationResult, state);
    applyAccelerationCap(accelerationResult.accelerations, options.maxAcceleration);
    for (let i = 0; i < state.particles.length; i += 1) {
      const particle = state.particles[i];
      particle.velocity = add(particle.velocity, scale(accelerationResult.accelerations[i], options.dt));
      particle.position = add(particle.position, scale(particle.velocity, options.dt));
    }
    state.time = cleanNumber(Math.min(options.duration, state.time + options.dt));
    state.stepIndex += 1;
    history.push(snapshotState(state));

    const metrics = computeMetrics(state, history, options);
    recordTrajectorySample(trajectoryAccumulator, metrics, state);
    detectMetricEvents(events, metrics, state, options);
    if (step === totalSteps - 1 || state.stepIndex % options.sampleEvery === 0) {
      frames.push(sampleFrame(state, history, options, metrics));
    }
  }

  const finalMetrics = computeMetrics(state, history, options);
  const classification = classifyRun(finalMetrics, events, options);
  const trajectoryDiagnostics = createTrajectoryDiagnostics({
    options,
    events,
    rootStats,
    trajectoryAccumulator,
  });
  const reducedRadiusDiagnostics = createReducedRadiusDiagnostics({
    options,
    trajectoryAccumulator,
    trajectoryDiagnostics,
  });
  const closureDiagnostics = createClosureDiagnostics({
    options,
    classification,
    events,
    rootStats,
    finalMetrics,
    trajectoryDiagnostics,
    reducedRadiusDiagnostics,
  });
  return {
    schema: "braid-ideal-held-release-causal-wake-toy-result.v1",
    createdAt: new Date().toISOString(),
    status: "priority_only_exploratory_toy",
    warning:
      "This runner is not a production central-solver claim. It is a scoped delayed-force toy for the held-release seed.",
    configuration: {
      initialCondition: {
        preset: options.preset,
        presetLabel: preset.label,
        decorationClass: preset.decorationClass,
        particles: initialParticles,
        velocity: [0, 0, 0],
        heldStationaryFor: options.holdTime,
        releaseTime: 0,
      },
      duration: options.duration,
      dt: options.dt,
      fieldSpeed: options.fieldSpeed,
      coupling: options.coupling,
      softening: options.softening,
      jacobianFloor: options.jacobianFloor,
      causalWeight: options.causalWeight,
      includeSelfHits: options.includeSelfHits,
      selfHitMinDelay: cleanNumber(options.selfHitMinDelay),
      maxAcceleration: Number.isFinite(options.maxAcceleration) ? options.maxAcceleration : null,
    },
    modelNotes: [
      "Each directed pair contributes through all detected causal roots in the retained history window.",
      "The force law uses q_i q_j r / (|r|^2 + softening^2)^(3/2), multiplied by the optional causal branch weight.",
      "The held prehistory is stationary from -holdTime to 0, so every initial partner wake has already crossed the seed.",
      options.includeSelfHits
        ? "Same-source causal roots are included as a priority-only toy probe and filtered to delayed roots only."
        : "Same-source self-hits are disabled in the default toy run.",
      "Architrinos are treated as primitives without physical mass; acceleration is a numerical response variable.",
    ],
    classification,
    closureDiagnostics,
    trajectoryDiagnostics,
    reducedRadiusDiagnostics,
    events,
    rootStats,
    finalMetrics,
    frames,
  };
}

function evaluateAccelerations(state, history, options) {
  const accelerations = state.particles.map(() => [0, 0, 0]);
  const pairRows = [];
  const rootStats = {
    totalRoots: 0,
    missingRoots: 0,
    smallJacobianRoots: 0,
    maxRootsPerDirectedPair: 0,
    selfHitRoots: 0,
    missingSelfHitRoots: 0,
    selfHitDirectedPairs: 0,
    maxSelfHitRootsPerDirectedPair: 0,
    maxBranchWeight: 0,
  };

  for (let i = 0; i < state.particles.length; i += 1) {
    const receiver = state.particles[i];
    for (let j = 0; j < state.particles.length; j += 1) {
      const selfHitPair = i === j;
      if (selfHitPair && !options.includeSelfHits) {
        continue;
      }
      const source = state.particles[j];
      const roots = findCausalRoots({ receiver, sourceIndex: j, hitTime: state.time, history, options }).filter(
        (root) => !selfHitPair || root.delay >= options.selfHitMinDelay
      );
      rootStats.maxRootsPerDirectedPair = Math.max(rootStats.maxRootsPerDirectedPair, roots.length);
      if (selfHitPair) {
        rootStats.selfHitDirectedPairs += 1;
        rootStats.maxSelfHitRootsPerDirectedPair = Math.max(
          rootStats.maxSelfHitRootsPerDirectedPair,
          roots.length
        );
      }
      if (roots.length === 0) {
        if (selfHitPair) {
          rootStats.missingSelfHitRoots += 1;
        } else {
          rootStats.missingRoots += 1;
        }
        pairRows.push({ receiver: receiver.id, source: source.id, selfHitPair, rootCount: 0 });
        continue;
      }
      for (const root of roots) {
        rootStats.totalRoots += 1;
        if (selfHitPair) {
          rootStats.selfHitRoots += 1;
        }
        if (root.smallJacobian) {
          rootStats.smallJacobianRoots += 1;
        }
        rootStats.maxBranchWeight = Math.max(rootStats.maxBranchWeight, root.branchWeight);
        const displacement = subtract(receiver.position, root.sourcePosition);
        const distanceSquared = dot(displacement, displacement);
        const denominator = Math.pow(distanceSquared + options.softening * options.softening, 1.5);
        const coefficient = options.coupling * receiver.q * source.q * root.branchWeight / denominator;
        accelerations[i] = add(accelerations[i], scale(displacement, coefficient));
      }
      pairRows.push({
        receiver: receiver.id,
        source: source.id,
        selfHitPair,
        rootCount: roots.length,
        roots: roots.map((root) => ({
          emissionTime: root.emissionTime,
          delay: root.delay,
          distance: root.distance,
          sourceJacobian: root.sourceJacobian,
          branchWeight: root.branchWeight,
        })),
      });
    }
  }

  return { accelerations, pairRows, rootStats };
}

function findCausalRoots({ receiver, sourceIndex, hitTime, history, options }) {
  const sourceTimes = history.map((row) => row.time);
  const roots = [];
  const startTime = Math.max(-options.holdTime, sourceTimes[0]);
  const endTime = hitTime;
  let previousTime = startTime;
  let previousResidual = causalResidual(receiver.position, sourceIndex, previousTime, hitTime, history, options);

  for (const segmentEnd of sourceTimes) {
    if (segmentEnd <= startTime) {
      continue;
    }
    if (segmentEnd > endTime) {
      break;
    }
    const currentTime = segmentEnd;
    const currentResidual = causalResidual(receiver.position, sourceIndex, currentTime, hitTime, history, options);
    if (Math.abs(previousResidual) <= 1e-10) {
      roots.push(buildRoot(receiver, sourceIndex, previousTime, hitTime, history, options));
    } else if (previousResidual * currentResidual < 0) {
      const rootTime = refineRoot({
        receiver,
        sourceIndex,
        low: previousTime,
        high: currentTime,
        lowResidual: previousResidual,
        highResidual: currentResidual,
        hitTime,
        history,
        options,
      });
      roots.push(buildRoot(receiver, sourceIndex, rootTime, hitTime, history, options));
    }
    previousTime = currentTime;
    previousResidual = currentResidual;
  }

  return dedupeRoots(roots);
}

function refineRoot({ receiver, sourceIndex, low, high, lowResidual, highResidual, hitTime, history, options }) {
  let lo = low;
  let hi = high;
  let fLo = lowResidual;
  let fHi = highResidual;
  for (let iteration = 0; iteration < 50; iteration += 1) {
    const mid = 0.5 * (lo + hi);
    const fMid = causalResidual(receiver.position, sourceIndex, mid, hitTime, history, options);
    if (Math.abs(fMid) <= 1e-12 || Math.abs(hi - lo) <= 1e-12) {
      return mid;
    }
    if (fLo * fMid <= 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }
  return Math.abs(fLo) <= Math.abs(fHi) ? lo : hi;
}

function buildRoot(receiver, sourceIndex, emissionTime, hitTime, history, options) {
  const sourceSample = sampleHistory(sourceIndex, emissionTime, history);
  const displacement = subtract(receiver.position, sourceSample.position);
  const distance = norm(displacement);
  const direction = distance > 0 ? scale(displacement, 1 / distance) : [0, 0, 0];
  const sourceNormalSpeed = dot(sourceSample.velocity, direction);
  const receiverNormalSpeed = dot(receiver.velocity, direction);
  const sourceJacobian = (options.fieldSpeed - sourceNormalSpeed) / options.fieldSpeed;
  const receiverNormalFactor = (options.fieldSpeed - receiverNormalSpeed) / options.fieldSpeed;
  const smallJacobian = Math.abs(sourceJacobian) < options.jacobianFloor;
  const clampedSourceJacobian = signPreservingMax(sourceJacobian, options.jacobianFloor);
  const branchWeight = options.causalWeight
    ? Math.abs(receiverNormalFactor / clampedSourceJacobian)
    : 1;
  return {
    emissionTime: cleanNumber(emissionTime),
    delay: cleanNumber(hitTime - emissionTime),
    distance: cleanNumber(distance),
    sourcePosition: sourceSample.position,
    sourceVelocity: sourceSample.velocity,
    sourceJacobian: cleanNumber(sourceJacobian),
    receiverNormalFactor: cleanNumber(receiverNormalFactor),
    smallJacobian,
    branchWeight: cleanNumber(branchWeight),
  };
}

function causalResidual(receiverPosition, sourceIndex, emissionTime, hitTime, history, options) {
  const sourceSample = sampleHistory(sourceIndex, emissionTime, history);
  const distance = norm(subtract(receiverPosition, sourceSample.position));
  return distance - options.fieldSpeed * (hitTime - emissionTime);
}

function sampleHistory(particleIndex, time, history) {
  if (time <= history[0].time) {
    return {
      position: cloneVector(history[0].positions[particleIndex]),
      velocity: cloneVector(history[0].velocities[particleIndex]),
    };
  }
  const last = history[history.length - 1];
  if (time >= last.time) {
    return {
      position: cloneVector(last.positions[particleIndex]),
      velocity: cloneVector(last.velocities[particleIndex]),
    };
  }

  let low = 0;
  let high = history.length - 1;
  while (high - low > 1) {
    const mid = Math.floor((low + high) / 2);
    if (history[mid].time <= time) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const a = history[low];
  const b = history[high];
  const span = b.time - a.time;
  const fraction = span > 0 ? (time - a.time) / span : 0;
  return {
    position: lerp(a.positions[particleIndex], b.positions[particleIndex], fraction),
    velocity: lerp(a.velocities[particleIndex], b.velocities[particleIndex], fraction),
  };
}

function computeMetrics(state, history, options) {
  const center = meanVector(state.particles.map((particle) => particle.position));
  const radii = state.particles.map((particle) => norm(subtract(particle.position, center)));
  const speeds = state.particles.map((particle) => norm(particle.velocity));
  const sameDistances = [];
  const oppositeDistances = [];
  for (let i = 0; i < state.particles.length; i += 1) {
    for (let j = i + 1; j < state.particles.length; j += 1) {
      const distance = norm(subtract(state.particles[i].position, state.particles[j].position));
      if (state.particles[i].q === state.particles[j].q) {
        sameDistances.push(distance);
      } else {
        oppositeDistances.push(distance);
      }
    }
  }
  const pairedOppositionErrors = [
    ...AXIS_SITE_PAIRS,
  ].map(([positiveSite, negativeSite]) => {
    const positiveSiteParticle = state.particles.find((particle) => particle.site === positiveSite);
    const negativeSiteParticle = state.particles.find((particle) => particle.site === negativeSite);
    return norm(add(subtract(positiveSiteParticle.position, center), subtract(negativeSiteParticle.position, center)));
  });
  const radialVelocityMean = mean(
    state.particles.map((particle) => {
      const offset = subtract(particle.position, center);
      const radius = norm(offset);
      return radius > 0 ? dot(offset, particle.velocity) / radius : 0;
    })
  );
  return {
    time: cleanNumber(state.time),
    center: cleanVector(center),
    radiusMean: cleanNumber(mean(radii)),
    radiusStd: cleanNumber(stddev(radii)),
    speedMean: cleanNumber(mean(speeds)),
    speedStd: cleanNumber(stddev(speeds)),
    speedMax: cleanNumber(Math.max(...speeds)),
    minSameDistance: cleanNumber(Math.min(...sameDistances)),
    minOppositeDistance: cleanNumber(Math.min(...oppositeDistances)),
    pairOppositionMean: cleanNumber(mean(pairedOppositionErrors)),
    pairOppositionMax: cleanNumber(Math.max(...pairedOppositionErrors)),
    radialVelocityMean: cleanNumber(radialVelocityMean),
    retainedHistoryRows: history.length,
    fieldSpeedRatioMax: cleanNumber(Math.max(...speeds) / options.fieldSpeed),
  };
}

function sampleFrame(state, history, options, metrics) {
  return {
    time: cleanNumber(state.time),
    stepIndex: state.stepIndex,
    metrics: metrics ?? computeMetrics(state, history, options),
    particles: state.particles.map((particle) => ({
      id: particle.id,
      site: particle.site,
      chargeType: particle.chargeType,
      q: particle.q,
      position: cleanVector(particle.position),
      velocity: cleanVector(particle.velocity),
      speed: cleanNumber(norm(particle.velocity)),
    })),
  };
}

function classifyRun(finalMetrics, events, options) {
  if (events.firstFieldSpeedCrossing && events.firstSamePolarityClosePass) {
    return "same_polarity_close_pass_with_field_speed_crossing";
  }
  if (events.firstFieldSpeedCrossing && events.firstOppositeClosePass) {
    return "opposite_polarity_close_pass_with_field_speed_crossing";
  }
  if (events.firstSamePolarityClosePass) {
    return "same_polarity_close_pass_without_field_speed_crossing";
  }
  if (events.firstOppositeClosePass) {
    return "opposite_polarity_close_pass_without_field_speed_crossing";
  }
  if (finalMetrics.radiusMean > 2 && finalMetrics.radialVelocityMean > 0) {
    return "expanding_escape_candidate";
  }
  if (
    finalMetrics.radiusMean > 0.25 &&
    finalMetrics.radiusMean < 1.75 &&
    finalMetrics.radiusStd < 0.05 &&
    finalMetrics.speedMax < options.fieldSpeed
  ) {
    return "bounded_equal-radius_transient_candidate";
  }
  return "unclassified_transient";
}

function createClosureDiagnostics({
  options,
  classification,
  events,
  rootStats,
  finalMetrics,
  trajectoryDiagnostics,
  reducedRadiusDiagnostics,
}) {
  const symmetryResiduals = {
    centerNorm: cleanNumber(norm(finalMetrics.center)),
    radiusStd: finalMetrics.radiusStd,
    speedStd: finalMetrics.speedStd,
    pairOppositionMax: finalMetrics.pairOppositionMax,
  };
  const symmetryResidualPass =
    symmetryResiduals.centerNorm <= TOY_CLOSURE_THRESHOLDS.centerNorm &&
    symmetryResiduals.radiusStd <= TOY_CLOSURE_THRESHOLDS.radiusStd &&
    symmetryResiduals.speedStd <= TOY_CLOSURE_THRESHOLDS.speedStd &&
    symmetryResiduals.pairOppositionMax <= TOY_CLOSURE_THRESHOLDS.pairOppositionMax;
  const rootCoveragePass = rootStats.missingRoots === 0 && !events.firstMissingRoot;
  const selfHitProbePass = !options.includeSelfHits || rootStats.selfHitRoots > 0;
  const fieldSpeedPass = !events.firstFieldSpeedCrossing;
  const boundedReturnCandidate =
    finalMetrics.radialVelocityMean <= 0 ||
    (finalMetrics.radiusMean <= TOY_CLOSURE_THRESHOLDS.boundedRadiusMean &&
      finalMetrics.radiusStd <= TOY_CLOSURE_THRESHOLDS.boundedRadiusStd);
  const firstClosureBlocker = firstPresent([
    [!symmetryResidualPass, "common_sphere_antipodal_symmetry_not_preserved"],
    [!rootCoveragePass, "causal_root_coverage_lost_in_toy_window"],
    [!fieldSpeedPass, "field_speed_crossing_before_retained_solver_promotion"],
    [!selfHitProbePass, "same_source_self_hit_rows_absent_in_toy_probe"],
    [
      !reducedRadiusDiagnostics.checks.postFirstExpansionInwardAccelerationObserved,
      "post_first_pass_inward_radial_acceleration_absent",
    ],
    [
      !trajectoryDiagnostics.checks.postFirstExpansionReturnObserved,
      "post_first_pass_bounded_return_turn_absent",
    ],
    [!boundedReturnCandidate, "bounded_return_or_stable_radius_absent"],
    [true, "retained_history_solver_row_absent"],
  ]);
  const sameLevelToyStatus = symmetryResidualPass
    ? "symmetry_channel_preserved_but_retained_branch_unauthorized"
    : "same_level_support_lost_in_toy_control";

  return {
    schema: "braid-ideal-held-release-toy-closure-diagnostic.v1",
    status: sameLevelToyStatus,
    preset: options.preset,
    priorityOnly: true,
    retainedBranchClaim: false,
    acceptedSameLevelBranchClaim: false,
    scoreMovement: "no_score_increase",
    classification,
    thresholds: TOY_CLOSURE_THRESHOLDS,
    symmetryResiduals,
    checks: {
      symmetryResidualPass,
      rootCoveragePass,
      fieldSpeedPass,
      selfHitProbePass,
      boundedReturnCandidate,
      wiggleWindowPass:
        trajectoryDiagnostics.checks.symmetryWindowPass &&
        trajectoryDiagnostics.checks.rootCoveragePass &&
        trajectoryDiagnostics.checks.fieldSpeedPass &&
        selfHitProbePass &&
        trajectoryDiagnostics.checks.postFirstExpansionReturnObserved,
      reducedRadiusEquationPass:
        reducedRadiusDiagnostics.checks.symmetryWindowPass &&
        reducedRadiusDiagnostics.checks.rootCoveragePass &&
        reducedRadiusDiagnostics.checks.fieldSpeedPass &&
        reducedRadiusDiagnostics.checks.selfHitProbePass &&
        reducedRadiusDiagnostics.checks.compressionToExpansionTurnObserved &&
        reducedRadiusDiagnostics.checks.postFirstExpansionInwardAccelerationObserved,
    },
    selfHitProbe: {
      enabled: options.includeSelfHits,
      minDelay: cleanNumber(options.selfHitMinDelay),
      delayedRootCount: rootStats.selfHitRoots,
      missingDirectedPairRows: rootStats.missingSelfHitRoots,
      authority: "priority_only_toy_probe_not_accepted_evidence",
    },
    firstClosureBlocker,
    firstWiggleBlocker: trajectoryDiagnostics.firstWiggleBlocker,
    firstReducedRadiusBlocker: reducedRadiusDiagnostics.firstReducedRadiusBlocker,
    nextProducerObject: "self_hit_held_release_solver_row",
    missingAcceptedFields: [
      "central_solver_retained_history_row",
      "same_source_self_hit_rows",
      "same_record_causal_root_replay",
      "retained_wake_history_rows",
      "same_record_action_ledger",
      "stability_or_return_margin_row",
      "retained_branch_certificate",
    ],
  };
}

function createTrajectoryAccumulator() {
  return {
    sampleCount: 0,
    extrema: {
      minRadiusMean: null,
      maxRadiusMean: null,
      maxRadiusStd: null,
      maxCenterNorm: null,
      maxSpeedStd: null,
      maxPairOppositionMax: null,
      maxFieldSpeedRatio: null,
      minSameDistance: null,
      minOppositeDistance: null,
    },
    previousRadialSign: 0,
    previousRadialVelocityMean: 0,
    radialTurnRows: [],
    previousRadialAccelerationSample: null,
    radialAccelerationRows: [],
  };
}

function recordTrajectorySample(accumulator, metrics, state) {
  accumulator.sampleCount += 1;
  updateExtremum(accumulator.extrema, "minRadiusMean", metrics, "radiusMean", "min", state);
  updateExtremum(accumulator.extrema, "maxRadiusMean", metrics, "radiusMean", "max", state);
  updateExtremum(accumulator.extrema, "maxRadiusStd", metrics, "radiusStd", "max", state);
  updateExtremum(accumulator.extrema, "maxCenterNorm", {
    ...metrics,
    centerNorm: norm(metrics.center),
  }, "centerNorm", "max", state);
  updateExtremum(accumulator.extrema, "maxSpeedStd", metrics, "speedStd", "max", state);
  updateExtremum(accumulator.extrema, "maxPairOppositionMax", metrics, "pairOppositionMax", "max", state);
  updateExtremum(accumulator.extrema, "maxFieldSpeedRatio", metrics, "fieldSpeedRatioMax", "max", state);
  updateExtremum(accumulator.extrema, "minSameDistance", metrics, "minSameDistance", "min", state);
  updateExtremum(accumulator.extrema, "minOppositeDistance", metrics, "minOppositeDistance", "min", state);
  recordRadialAccelerationSample(accumulator, metrics, state);

  const radialSign = signWithDeadband(metrics.radialVelocityMean, TOY_CLOSURE_THRESHOLDS.radialTurnEpsilon);
  if (radialSign !== 0) {
    if (accumulator.previousRadialSign !== 0 && radialSign !== accumulator.previousRadialSign) {
      accumulator.radialTurnRows.push({
        time: cleanNumber(metrics.time),
        stepIndex: state.stepIndex,
        turnKind:
          accumulator.previousRadialSign < 0 && radialSign > 0
            ? "compression_to_expansion"
            : "expansion_to_compression",
        previousRadialVelocityMean: cleanNumber(accumulator.previousRadialVelocityMean),
        radialVelocityMean: cleanNumber(metrics.radialVelocityMean),
        radiusMean: cleanNumber(metrics.radiusMean),
        fieldSpeedRatioMax: cleanNumber(metrics.fieldSpeedRatioMax),
      });
    }
    accumulator.previousRadialSign = radialSign;
    accumulator.previousRadialVelocityMean = metrics.radialVelocityMean;
  }
}

function recordRadialAccelerationSample(accumulator, metrics, state) {
  const previous = accumulator.previousRadialAccelerationSample;
  if (previous != null) {
    const deltaTime = metrics.time - previous.time;
    if (deltaTime > 0) {
      accumulator.radialAccelerationRows.push({
        time: cleanNumber(metrics.time),
        stepIndex: state.stepIndex,
        radiusMean: cleanNumber(metrics.radiusMean),
        radialVelocityMean: cleanNumber(metrics.radialVelocityMean),
        radialAccelerationMean: cleanNumber(
          (metrics.radialVelocityMean - previous.radialVelocityMean) / deltaTime
        ),
        fieldSpeedRatioMax: cleanNumber(metrics.fieldSpeedRatioMax),
      });
    }
  }
  accumulator.previousRadialAccelerationSample = {
    time: metrics.time,
    radialVelocityMean: metrics.radialVelocityMean,
  };
}

function createTrajectoryDiagnostics({ options, events, rootStats, trajectoryAccumulator }) {
  const extrema = cleanExtrema(trajectoryAccumulator.extrema);
  const windowResiduals = {
    centerNormMax: extrema.maxCenterNorm.value,
    radiusStdMax: extrema.maxRadiusStd.value,
    speedStdMax: extrema.maxSpeedStd.value,
    pairOppositionMax: extrema.maxPairOppositionMax.value,
  };
  const symmetryWindowPass =
    windowResiduals.centerNormMax <= TOY_CLOSURE_THRESHOLDS.centerNorm &&
    windowResiduals.radiusStdMax <= TOY_CLOSURE_THRESHOLDS.radiusStd &&
    windowResiduals.speedStdMax <= TOY_CLOSURE_THRESHOLDS.speedStd &&
    windowResiduals.pairOppositionMax <= TOY_CLOSURE_THRESHOLDS.pairOppositionMax;
  const rootCoveragePass = rootStats.missingRoots === 0 && !events.firstMissingRoot;
  const selfHitProbePass = !options.includeSelfHits || rootStats.selfHitRoots > 0;
  const fieldSpeedPass = !events.firstFieldSpeedCrossing;
  const firstCompressionToExpansionTurn =
    trajectoryAccumulator.radialTurnRows.find((row) => row.turnKind === "compression_to_expansion") ?? null;
  const firstExpansionToCompressionTurnAfterFirstExpansion =
    firstCompressionToExpansionTurn == null
      ? null
      : trajectoryAccumulator.radialTurnRows.find(
          (row) =>
            row.turnKind === "expansion_to_compression" &&
            row.stepIndex > firstCompressionToExpansionTurn.stepIndex
        ) ?? null;
  const postFirstExpansionReturnObserved = firstExpansionToCompressionTurnAfterFirstExpansion != null;
  const status = firstPresent([
    [!symmetryWindowPass, "same_level_window_lost"],
    [!rootCoveragePass, "causal_root_coverage_lost"],
    [!fieldSpeedPass, "single_compression_escape_with_field_speed_crossing"],
    [!selfHitProbePass, "same_source_self_hit_rows_absent_in_toy_probe"],
    [!firstCompressionToExpansionTurn, "radial_turn_not_observed"],
    [!postFirstExpansionReturnObserved, "single_compression_then_escape"],
    [true, "post_pass_return_candidate_observed_but_retained_branch_unauthorized"],
  ]);
  const firstWiggleBlocker = firstPresent([
    [!symmetryWindowPass, "same_level_window_symmetry_lost"],
    [!rootCoveragePass, "causal_root_coverage_lost_in_toy_window"],
    [!fieldSpeedPass, "field_speed_crossing_before_retained_solver_promotion"],
    [!selfHitProbePass, "same_source_self_hit_rows_absent_in_toy_probe"],
    [!firstCompressionToExpansionTurn, "first_radial_turn_not_detected"],
    [!postFirstExpansionReturnObserved, "post_first_pass_return_turn_absent"],
    [true, "retained_history_solver_row_absent"],
  ]);

  return {
    schema: "braid-ideal-held-release-wiggle-window-diagnostic.v1",
    status,
    preset: options.preset,
    priorityOnly: true,
    retainedBranchClaim: false,
    acceptedSameLevelBranchClaim: false,
    scoreMovement: "no_score_increase",
    sampleCount: trajectoryAccumulator.sampleCount,
    thresholds: {
      centerNorm: TOY_CLOSURE_THRESHOLDS.centerNorm,
      radiusStd: TOY_CLOSURE_THRESHOLDS.radiusStd,
      speedStd: TOY_CLOSURE_THRESHOLDS.speedStd,
      pairOppositionMax: TOY_CLOSURE_THRESHOLDS.pairOppositionMax,
      radialTurnEpsilon: TOY_CLOSURE_THRESHOLDS.radialTurnEpsilon,
      radialAccelerationEpsilon: TOY_CLOSURE_THRESHOLDS.radialAccelerationEpsilon,
    },
    windowResiduals,
    extrema,
    radialTurnRows: trajectoryAccumulator.radialTurnRows,
    firstCompressionToExpansionTurn,
    firstExpansionToCompressionTurnAfterFirstExpansion,
    checks: {
      symmetryWindowPass,
      rootCoveragePass,
      fieldSpeedPass,
      selfHitProbePass,
      compressionToExpansionTurnObserved: firstCompressionToExpansionTurn != null,
      postFirstExpansionReturnObserved,
    },
    selfHitProbe: {
      enabled: options.includeSelfHits,
      minDelay: cleanNumber(options.selfHitMinDelay),
      delayedRootCount: rootStats.selfHitRoots,
      missingDirectedPairRows: rootStats.missingSelfHitRoots,
      authority: "priority_only_toy_probe_not_accepted_evidence",
    },
    firstWiggleBlocker,
    nextProducerObject: "self_hit_held_release_solver_row",
    missingAcceptedFields: [
      "central_solver_retained_history_row",
      "same_source_self_hit_rows",
      "same_record_causal_root_replay",
      "retained_wake_history_rows",
      "same_record_action_ledger",
      "stability_or_return_margin_row",
      "retained_branch_certificate",
    ],
  };
}

function createReducedRadiusDiagnostics({ options, trajectoryAccumulator, trajectoryDiagnostics }) {
  const epsilon = TOY_CLOSURE_THRESHOLDS.radialAccelerationEpsilon;
  const firstTurn = trajectoryDiagnostics.firstCompressionToExpansionTurn;
  const radialAccelerationRows = trajectoryAccumulator.radialAccelerationRows;
  const firstTurnAccelerationRow =
    firstTurn == null
      ? null
      : radialAccelerationRows.find((row) => row.stepIndex === firstTurn.stepIndex) ?? null;
  const postFirstExpansionRows =
    firstTurn == null
      ? []
      : radialAccelerationRows.filter((row) => row.stepIndex > firstTurn.stepIndex);
  const postFirstExpansionSummary = summarizeRadialAccelerationRows(postFirstExpansionRows, epsilon);
  const firstPostFirstExpansionInwardAccelerationRow =
    postFirstExpansionRows.find((row) => row.radialAccelerationMean < -epsilon) ?? null;
  const status = firstPresent([
    [
      !trajectoryDiagnostics.checks.symmetryWindowPass,
      "same_level_window_lost_before_reduced_radius_equation",
    ],
    [
      !trajectoryDiagnostics.checks.rootCoveragePass,
      "causal_root_coverage_lost_before_reduced_radius_equation",
    ],
    [
      !trajectoryDiagnostics.checks.fieldSpeedPass,
      "field_speed_crossing_before_reduced_radius_equation",
    ],
    [
      !trajectoryDiagnostics.checks.selfHitProbePass,
      "same_source_self_hit_rows_absent_in_toy_probe",
    ],
    [
      !trajectoryDiagnostics.checks.compressionToExpansionTurnObserved,
      "compression_to_expansion_turn_absent",
    ],
    [
      !firstPostFirstExpansionInwardAccelerationRow,
      "post_turn_inward_radial_acceleration_absent",
    ],
    [
      !trajectoryDiagnostics.checks.postFirstExpansionReturnObserved,
      "post_turn_inward_acceleration_without_return_turn",
    ],
    [true, "return_candidate_observed_but_retained_solver_row_absent"],
  ]);
  const firstReducedRadiusBlocker = firstPresent([
    [!trajectoryDiagnostics.checks.symmetryWindowPass, "same_level_window_symmetry_lost"],
    [!trajectoryDiagnostics.checks.rootCoveragePass, "causal_root_coverage_lost_in_toy_window"],
    [!trajectoryDiagnostics.checks.fieldSpeedPass, "field_speed_crossing_before_reduced_radius_equation"],
    [!trajectoryDiagnostics.checks.selfHitProbePass, "same_source_self_hit_rows_absent_in_toy_probe"],
    [!trajectoryDiagnostics.checks.compressionToExpansionTurnObserved, "first_radial_turn_not_detected"],
    [!firstPostFirstExpansionInwardAccelerationRow, "post_turn_inward_radial_acceleration_absent"],
    [!trajectoryDiagnostics.checks.postFirstExpansionReturnObserved, "post_first_pass_return_turn_absent"],
    [true, "retained_history_solver_row_absent"],
  ]);

  return {
    schema: "braid-ideal-reduced-radius-equation-diagnostic.v1",
    status,
    preset: options.preset,
    priorityOnly: true,
    retainedBranchClaim: false,
    acceptedSameLevelBranchClaim: false,
    scoreMovement: "no_score_increase",
    equationVariables: {
      radius: "R(t)=mean_i |x_i(t)-C(t)|",
      radialVelocity: "dot_R(t)=mean_i <x_i-C, dot_x_i-dot_C>/|x_i-C|",
      radialAcceleration: "ddot_R(t)=Delta dot_R / Delta t finite-difference diagnostic",
    },
    thresholds: {
      radialTurnEpsilon: TOY_CLOSURE_THRESHOLDS.radialTurnEpsilon,
      radialAccelerationEpsilon: epsilon,
    },
    firstCompressionToExpansionTurn: firstTurn,
    radialAccelerationAtFirstCompressionToExpansionTurn: firstTurnAccelerationRow,
    firstPostFirstExpansionInwardAccelerationRow,
    postFirstExpansionSummary,
    checks: {
      symmetryWindowPass: trajectoryDiagnostics.checks.symmetryWindowPass,
      rootCoveragePass: trajectoryDiagnostics.checks.rootCoveragePass,
      fieldSpeedPass: trajectoryDiagnostics.checks.fieldSpeedPass,
      selfHitProbePass: trajectoryDiagnostics.checks.selfHitProbePass,
      compressionToExpansionTurnObserved:
        trajectoryDiagnostics.checks.compressionToExpansionTurnObserved,
      postFirstExpansionInwardAccelerationObserved:
        firstPostFirstExpansionInwardAccelerationRow != null,
      postFirstExpansionReturnObserved:
        trajectoryDiagnostics.checks.postFirstExpansionReturnObserved,
    },
    firstReducedRadiusBlocker,
    nextProducerObject: "self_hit_held_release_solver_row",
    missingAcceptedFields: [
      "central_solver_retained_history_row",
      "same_source_self_hit_rows",
      "same_record_causal_root_replay",
      "retained_wake_history_rows",
      "same_record_action_ledger",
      "stability_or_return_margin_row",
      "retained_branch_certificate",
    ],
  };
}

function summarizeRadialAccelerationRows(rows, epsilon) {
  const summary = {
    rowCount: rows.length,
    inwardRows: 0,
    outwardRows: 0,
    deadbandRows: 0,
    minRadialAccelerationRow: null,
    maxRadialAccelerationRow: null,
  };
  for (const row of rows) {
    const sign = signWithDeadband(row.radialAccelerationMean, epsilon);
    if (sign < 0) {
      summary.inwardRows += 1;
    } else if (sign > 0) {
      summary.outwardRows += 1;
    } else {
      summary.deadbandRows += 1;
    }
    if (
      summary.minRadialAccelerationRow == null ||
      row.radialAccelerationMean < summary.minRadialAccelerationRow.radialAccelerationMean
    ) {
      summary.minRadialAccelerationRow = row;
    }
    if (
      summary.maxRadialAccelerationRow == null ||
      row.radialAccelerationMean > summary.maxRadialAccelerationRow.radialAccelerationMean
    ) {
      summary.maxRadialAccelerationRow = row;
    }
  }
  return summary;
}

function updateExtremum(extrema, outputKey, metrics, inputKey, mode, state) {
  const value = metrics[inputKey];
  if (!Number.isFinite(value)) {
    return;
  }
  const current = extrema[outputKey];
  const shouldReplace =
    current == null || (mode === "min" ? value < current.value : value > current.value);
  if (shouldReplace) {
    extrema[outputKey] = {
      value: cleanNumber(value),
      time: cleanNumber(metrics.time),
      stepIndex: state.stepIndex,
    };
  }
}

function cleanExtrema(extrema) {
  return Object.fromEntries(
    Object.entries(extrema).map(([key, value]) => [
      key,
      value ?? { value: null, time: null, stepIndex: null },
    ])
  );
}

function detectMetricEvents(events, metrics, state, options) {
  if (!events.firstAnyClosePass && metrics.minOppositeDistance <= options.closeRadius) {
    events.firstAnyClosePass = {
      time: cleanNumber(state.time),
      stepIndex: state.stepIndex,
      pairType: "opposite-polarity",
      distance: metrics.minOppositeDistance,
    };
  }
  if (!events.firstAnyClosePass && metrics.minSameDistance <= options.closeRadius) {
    events.firstAnyClosePass = {
      time: cleanNumber(state.time),
      stepIndex: state.stepIndex,
      pairType: "same-polarity",
      distance: metrics.minSameDistance,
    };
  }
  if (!events.firstOppositeClosePass && metrics.minOppositeDistance <= options.closeRadius) {
    events.firstOppositeClosePass = {
      time: cleanNumber(state.time),
      stepIndex: state.stepIndex,
      minOppositeDistance: metrics.minOppositeDistance,
    };
  }
  if (!events.firstSamePolarityClosePass && metrics.minSameDistance <= options.closeRadius) {
    events.firstSamePolarityClosePass = {
      time: cleanNumber(state.time),
      stepIndex: state.stepIndex,
      minSameDistance: metrics.minSameDistance,
    };
  }
  if (!events.firstFieldSpeedCrossing && metrics.speedMax >= options.fieldSpeed) {
    events.firstFieldSpeedCrossing = {
      time: cleanNumber(state.time),
      stepIndex: state.stepIndex,
      speedMax: metrics.speedMax,
      fieldSpeed: options.fieldSpeed,
    };
  }
}

function detectRootEvents(events, accelerationResult, state) {
  if (!events.firstMissingRoot && accelerationResult.rootStats.missingRoots > 0) {
    events.firstMissingRoot = {
      time: cleanNumber(state.time),
      stepIndex: state.stepIndex,
      missingRoots: accelerationResult.rootStats.missingRoots,
    };
  }
  if (!events.firstSmallJacobian && accelerationResult.rootStats.smallJacobianRoots > 0) {
    events.firstSmallJacobian = {
      time: cleanNumber(state.time),
      stepIndex: state.stepIndex,
      smallJacobianRoots: accelerationResult.rootStats.smallJacobianRoots,
    };
  }
}

function mergeRootStats(total, next) {
  total.totalRoots += next.totalRoots;
  total.missingRoots += next.missingRoots;
  total.smallJacobianRoots += next.smallJacobianRoots;
  total.maxRootsPerDirectedPair = Math.max(total.maxRootsPerDirectedPair, next.maxRootsPerDirectedPair);
  total.selfHitRoots += next.selfHitRoots;
  total.missingSelfHitRoots += next.missingSelfHitRoots;
  total.selfHitDirectedPairs += next.selfHitDirectedPairs;
  total.maxSelfHitRootsPerDirectedPair = Math.max(
    total.maxSelfHitRootsPerDirectedPair,
    next.maxSelfHitRootsPerDirectedPair
  );
  total.maxBranchWeight = Math.max(total.maxBranchWeight, next.maxBranchWeight);
}

function applyAccelerationCap(accelerations, maxAcceleration) {
  if (!Number.isFinite(maxAcceleration)) {
    return;
  }
  for (let index = 0; index < accelerations.length; index += 1) {
    const magnitude = norm(accelerations[index]);
    if (magnitude > maxAcceleration) {
      accelerations[index] = scale(accelerations[index], maxAcceleration / magnitude);
    }
  }
}

function writeOutputs(result, options) {
  fs.mkdirSync(options.outputDir, { recursive: true });
  const jsonPath = path.join(options.outputDir, "result.json");
  const csvPath = path.join(options.outputDir, "metrics.csv");
  fs.writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`);
  fs.writeFileSync(csvPath, createMetricsCsv(result.frames));
}

function createMetricsCsv(frames) {
  const header = [
    "time",
    "radiusMean",
    "radiusStd",
    "speedMean",
    "speedMax",
    "minSameDistance",
    "minOppositeDistance",
    "pairOppositionMean",
    "radialVelocityMean",
    "fieldSpeedRatioMax",
  ];
  const rows = frames.map((frame) =>
    header
      .map((key) => {
        const value = key === "time" ? frame.time : frame.metrics[key];
        return Number.isFinite(value) ? String(value) : "";
      })
      .join(",")
  );
  return `${header.join(",")}\n${rows.join("\n")}\n`;
}

function createConsoleSummary(result) {
  return {
    schema: "braid-ideal-held-release-causal-wake-toy-console-summary.v1",
    status: result.status,
    classification: result.classification,
    closureDiagnostics: result.closureDiagnostics,
    trajectoryDiagnostics: result.trajectoryDiagnostics,
    reducedRadiusDiagnostics: result.reducedRadiusDiagnostics,
    outputDir: options.outputDir,
    configuration: result.configuration,
    events: result.events,
    rootStats: result.rootStats,
    finalMetrics: result.finalMetrics,
  };
}

function firstPresent(entries) {
  for (const [condition, value] of entries) {
    if (condition) {
      return value;
    }
  }
  return null;
}

function snapshotState(state, time = state.time, override = null) {
  return {
    time: cleanNumber(time),
    positions: override?.positions?.map(cloneVector) ?? state.particles.map((particle) => cloneVector(particle.position)),
    velocities:
      override?.velocities?.map(cloneVector) ?? state.particles.map((particle) => cloneVector(particle.velocity)),
  };
}

function dedupeRoots(roots) {
  const deduped = [];
  for (const root of roots) {
    if (!deduped.some((candidate) => Math.abs(candidate.emissionTime - root.emissionTime) < 1e-8)) {
      deduped.push(root);
    }
  }
  return deduped;
}

function signPreservingMax(value, floor) {
  if (Math.abs(value) >= floor) {
    return value;
  }
  return value < 0 ? -floor : floor;
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(a, scalar) {
  return [a[0] * scalar, a[1] * scalar, a[2] * scalar];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function lerp(a, b, fraction) {
  return [
    a[0] + (b[0] - a[0]) * fraction,
    a[1] + (b[1] - a[1]) * fraction,
    a[2] + (b[2] - a[2]) * fraction,
  ];
}

function cloneVector(value) {
  return [value[0], value[1], value[2]];
}

function meanVector(vectors) {
  const total = vectors.reduce((sum, value) => add(sum, value), [0, 0, 0]);
  return scale(total, 1 / vectors.length);
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stddev(values) {
  const valueMean = mean(values);
  return Math.sqrt(mean(values.map((value) => (value - valueMean) ** 2)));
}

function cleanVector(vector) {
  return vector.map(cleanNumber);
}

function cleanNumber(value) {
  return Number.isFinite(value) ? Number(value.toPrecision(15)) : value;
}

function signWithDeadband(value, epsilon) {
  if (Math.abs(value) <= epsilon) {
    return 0;
  }
  return value < 0 ? -1 : 1;
}

function requireNext(rawArgs, index, arg) {
  const value = rawArgs[index + 1];
  if (value == null || value.startsWith("--")) {
    throw new TypeError(`${arg} requires a value`);
  }
  return value;
}

function finiteNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`${name} must be finite`);
  }
  return number;
}

function positiveFiniteNumber(value, name) {
  const number = finiteNumber(value, name);
  if (number <= 0) {
    throw new TypeError(`${name} must be positive`);
  }
  return number;
}

function nonnegativeFiniteNumber(value, name) {
  const number = finiteNumber(value, name);
  if (number < 0) {
    throw new TypeError(`${name} must be nonnegative`);
  }
  return number;
}

function positiveInteger(value, name) {
  const number = positiveFiniteNumber(value, name);
  return Math.max(1, Math.round(number));
}

function printUsage(exitCode) {
  console.log(`Usage: node scripts/braid-ideal/held-release-causal-wake-toy.mjs [options]

Runs the priority-only six-architrino held-release seed:
  p_x=(1,0,0), p_y=(0,1,0), p_z=(0,0,1)
  e_x=(-1,0,0), e_y=(0,-1,0), e_z=(0,0,-1)

Options:
  --duration <number>          released integration duration, default 3
  --dt <number>                integration step, default 0.002
  --hold-time <number>         stationary prehistory duration, default 4
  --field-speed <number>       causal wake speed, default 1
  --coupling <number>          pair-force coupling, default 1
  --softening <number>         distance softening, default 0.05
  --jacobian-floor <number>    branch-weight floor, default 0.05
  --close-radius <number>      close-pass event threshold, default 0.15
  --sample-every <integer>     output sample stride, default 10
  --preset <name>              initial decoration, one of face-opposite, axial-paired
  --max-acceleration <number>  optional acceleration cap
  --include-self-hits          include delayed same-source roots as a priority-only toy probe
  --self-hit-min-delay <num>   minimum delayed self-hit root delay, default dt
  --no-causal-weight           disable causal branch weighting
  --out <path>                 output directory, default ${DEFAULT_OUTPUT_DIR}
`);
  process.exit(exitCode);
}
