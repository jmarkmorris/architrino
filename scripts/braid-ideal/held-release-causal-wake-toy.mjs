#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_OUTPUT_DIR = path.join(".tmp", "braid-ideal", "held-release-causal-wake-toy");

const AXIS_SITE_PAIRS = Object.freeze([
  Object.freeze(["+x", "-x"]),
  Object.freeze(["+y", "-y"]),
  Object.freeze(["+z", "-z"]),
]);

const PREHISTORY_MODES = Object.freeze([
  "stationary-held-release",
  "kick-at-release",
  "moving-prehistory",
]);

const CYCLIC_SITE_MAP = Object.freeze({
  "+x": "+y",
  "+y": "+z",
  "+z": "+x",
  "-x": "-y",
  "-y": "-z",
  "-z": "-x",
});

const HOLD_ROTATION_MAX_ANGLE_STEP = 0.005;

// Sea-screened mode: 12 like Noether braid assemblies on the FCC nearest-neighbor
// shell (attempt `aa` of the SH-0-sea diagnostic candidate model), each a held
// static face-opposite six-site decoration with aligned orientation and a declared
// held history window. One-way environment: the held neighbors act on the released
// seed; the seed does not back-react on the neighbors (declared held histories).
// See reference/priorities/braid-archive/braid-ideal/sh-0-sea-diagnostic-candidate-model.md,
// Computed Dipole Wake-Sum Result.
const FCC_SEA_DIRECTIONS = Object.freeze([
  [1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],
  [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1],
  [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1],
].map((direction) => Object.freeze(direction)));

const FCC_SEA_BRAID_UNIT_SITES = Object.freeze([
  Object.freeze({ q: 1, offset: Object.freeze([1, 0, 0]) }),
  Object.freeze({ q: 1, offset: Object.freeze([0, 1, 0]) }),
  Object.freeze({ q: 1, offset: Object.freeze([0, 0, 1]) }),
  Object.freeze({ q: -1, offset: Object.freeze([-1, 0, 0]) }),
  Object.freeze({ q: -1, offset: Object.freeze([0, -1, 0]) }),
  Object.freeze({ q: -1, offset: Object.freeze([0, 0, -1]) }),
]);

const FCC_SEA_MIN_NON_OVERLAP_SPACING = 2 * Math.SQRT2;

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

function parseArgs(argv) {
  const rawArgs = [];
  for (const arg of argv) {
    if (arg.startsWith("--") && arg.includes("=")) {
      const eq = arg.indexOf("=");
      rawArgs.push(arg.slice(0, eq), arg.slice(eq + 1));
    } else {
      rawArgs.push(arg);
    }
  }
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
    groupVelocity: [0, 0, 0],
    causalWeight: true,
    includeSelfHits: false,
    selfHitMinDelay: null,
    selfHitKernel: "naive",
    maxAcceleration: Infinity,
    surfaceSpeedFraction: 0,
    spinAxis: [1, 1, 1],
    prehistoryMode: "stationary-held-release",
    fccSeaSpacing: null,
    fccSeaHeldWindow: 24,
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
    } else if (arg === "--group-velocity") {
      parsed.groupVelocity = vector3(requireNext(rawArgs, index, arg), "group-velocity");
      index += 1;
    } else if (arg === "--max-acceleration") {
      parsed.maxAcceleration = positiveFiniteNumber(requireNext(rawArgs, index, arg), "max-acceleration");
      index += 1;
    } else if (arg === "--include-self-hits") {
      parsed.includeSelfHits = true;
    } else if (arg === "--self-hit-min-delay") {
      parsed.selfHitMinDelay = nonnegativeFiniteNumber(requireNext(rawArgs, index, arg), "self-hit-min-delay");
      index += 1;
    } else if (arg === "--self-hit-kernel") {
      parsed.selfHitKernel = requireNext(rawArgs, index, arg);
      if (!SELF_HIT_KERNELS.includes(parsed.selfHitKernel)) {
        throw new TypeError(`--self-hit-kernel must be one of: ${SELF_HIT_KERNELS.join("|")}`);
      }
      index += 1;
    } else if (arg === "--no-causal-weight") {
      parsed.causalWeight = false;
    } else if (arg === "--surface-speed-fraction") {
      parsed.surfaceSpeedFraction = nonnegativeFiniteNumber(
        requireNext(rawArgs, index, arg),
        "surface-speed-fraction"
      );
      index += 1;
    } else if (arg === "--spin-axis") {
      parsed.spinAxis = vector3(requireNext(rawArgs, index, arg), "spin-axis");
      index += 1;
    } else if (arg === "--prehistory-mode") {
      parsed.prehistoryMode = requireNext(rawArgs, index, arg);
      if (!PREHISTORY_MODES.includes(parsed.prehistoryMode)) {
        throw new TypeError(`--prehistory-mode must be one of: ${PREHISTORY_MODES.join("|")}`);
      }
      index += 1;
    } else if (arg === "--fcc-sea-spacing") {
      parsed.fccSeaSpacing = positiveFiniteNumber(requireNext(rawArgs, index, arg), "fcc-sea-spacing");
      index += 1;
    } else if (arg === "--fcc-sea-held-window") {
      parsed.fccSeaHeldWindow = positiveFiniteNumber(
        requireNext(rawArgs, index, arg),
        "fcc-sea-held-window"
      );
      index += 1;
    } else {
      throw new TypeError(`Unknown argument: ${arg}`);
    }
  }

  if (norm(parsed.spinAxis) === 0) {
    throw new TypeError("spin-axis must be a nonzero vector");
  }
  if (parsed.prehistoryMode === "stationary-held-release" && parsed.surfaceSpeedFraction > 0) {
    throw new TypeError(
      "--surface-speed-fraction > 0 requires --prehistory-mode kick-at-release or moving-prehistory"
    );
  }
  if (parsed.fccSeaSpacing != null && parsed.fccSeaSpacing < FCC_SEA_MIN_NON_OVERLAP_SPACING) {
    throw new TypeError(
      `--fcc-sea-spacing must be >= ${FCC_SEA_MIN_NON_OVERLAP_SPACING} (FCC shell overlap floor 2*sqrt(2))`
    );
  }
  if (parsed.selfHitKernel !== "naive" && !parsed.includeSelfHits) {
    throw new TypeError("--self-hit-kernel chart-click requires --include-self-hits");
  }
  parsed.outputDir = parsed.outputDir ?? INITIAL_PARTICLE_PRESETS[parsed.preset].outputDir;
  parsed.selfHitMinDelay = parsed.selfHitMinDelay ?? parsed.dt;
  return parsed;
}

function runHeldRelease(options) {
  const preset = INITIAL_PARTICLE_PRESETS[options.preset];
  const initialParticles = preset.particles;
  const groupVelocity = cloneVector(options.groupVelocity);
  const spinRelease = createAngularMomentumRelease(options, initialParticles);
  const particles = initialParticles.map((particle, index) => ({
    ...particle,
    position: cloneVector(particle.position),
    velocity: add(cloneVector(groupVelocity), spinRelease.releaseVelocities[index]),
  }));
  const state = {
    time: 0,
    stepIndex: 0,
    particles,
  };
  const history = createHoldWindowHistory(state, options, initialParticles, groupVelocity, spinRelease);
  const releaseContinuity = computeReleaseContinuity(state, options, initialParticles, groupVelocity, spinRelease);
  const kinematicAngularMomentum = cleanVector(
    state.particles.reduce(
      (sum, particle) => add(sum, cross(particle.position, particle.velocity)),
      [0, 0, 0]
    )
  );
  const frames = [sampleFrame(state, history, options, null)];
  const events = {
    firstAnyClosePass: null,
    firstOppositeClosePass: null,
    firstSamePolarityClosePass: null,
    firstFieldSpeedCrossing: null,
    firstMissingRoot: null,
    firstSmallJacobian: null,
    firstSelfHitRoot: null,
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

  const seaShell = createFccSeaShell(options);
  const seaStats = seaShell
    ? {
        contributions: 0,
        missingHeldWindowRoots: 0,
        minSourceDistance: Infinity,
        maxBranchWeight: 0,
        maxDelay: 0,
      }
    : null;
  const seaRadialProjectionRows = seaShell ? [] : null;
  let releaseSeaRadialProjection = null;

  const totalSteps = Math.ceil(options.duration / options.dt);
  for (let step = 0; step < totalSteps; step += 1) {
    const accelerationResult = evaluateAccelerations(state, history, options);
    mergeRootStats(rootStats, accelerationResult.rootStats);
    detectRootEvents(events, accelerationResult, state);
    if (seaShell) {
      const seaResult = evaluateSeaAccelerations(state, options, seaShell);
      for (let i = 0; i < state.particles.length; i += 1) {
        accelerationResult.accelerations[i] = add(
          accelerationResult.accelerations[i],
          seaResult.accelerations[i]
        );
      }
      seaStats.contributions += seaResult.stats.contributions;
      seaStats.missingHeldWindowRoots += seaResult.stats.missingHeldWindowRoots;
      seaStats.minSourceDistance = Math.min(
        seaStats.minSourceDistance,
        seaResult.stats.minSourceDistance
      );
      seaStats.maxBranchWeight = Math.max(seaStats.maxBranchWeight, seaResult.stats.maxBranchWeight);
      seaStats.maxDelay = Math.max(seaStats.maxDelay, seaResult.stats.maxDelay);
      if (step === 0) {
        releaseSeaRadialProjection = seaResult.radialProjection;
      }
      if (step === totalSteps - 1 || state.stepIndex % options.sampleEvery === 0) {
        seaRadialProjectionRows.push({
          time: cleanNumber(state.time),
          seaRadialProjection: seaResult.radialProjection,
        });
      }
    }
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
    spinRelease,
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
        velocity: cleanVector(groupVelocity),
        centerFrameVelocity: [0, 0, 0],
        heldStationaryFor: options.holdTime,
        releaseTime: 0,
      },
      duration: options.duration,
      dt: options.dt,
      fieldSpeed: options.fieldSpeed,
      groupVelocity: cleanVector(groupVelocity),
      groupSpeed: cleanNumber(norm(groupVelocity)),
      coupling: options.coupling,
      softening: options.softening,
      jacobianFloor: options.jacobianFloor,
      causalWeight: options.causalWeight,
      includeSelfHits: options.includeSelfHits,
      selfHitMinDelay: cleanNumber(options.selfHitMinDelay),
      maxAcceleration: Number.isFinite(options.maxAcceleration) ? options.maxAcceleration : null,
      prehistoryMode: options.prehistoryMode,
      angularMomentumRelease: {
        prehistoryMode: options.prehistoryMode,
        surfaceSpeedFraction: cleanNumber(options.surfaceSpeedFraction),
        actualTangentialSpeed: cleanNumber(spinRelease.tangentialSpeed),
        angularRate: cleanNumber(spinRelease.angularRate),
        spinAxisInput: cleanVector(cloneVector(options.spinAxis)),
        spinAxis: cleanVector(spinRelease.spinAxisUnit),
        referencePerpendicularRadius: cleanNumber(spinRelease.referencePerpendicularRadius),
        perpendicularRadii: spinRelease.perpendicularRadii.map(cleanNumber),
        rotationActive: spinRelease.rotationActive,
        kinematicAngularMomentum,
        kinematicAngularMomentumNorm: cleanNumber(norm(kinematicAngularMomentum)),
        kinematicAngularMomentumNote:
          "diagnostic branch-ledger bookkeeping with unit integration weights; architrinos have no physical mass",
        holdHistory: {
          representation: spinRelease.holdHistoryRepresentation,
          sampleStep: cleanNumber(spinRelease.holdHistorySampleStep),
          rows: spinRelease.holdHistoryRows,
        },
        releaseContinuity,
      },
      ...(seaShell
        ? {
            fccSeaShell: {
              spacing: cleanNumber(seaShell.spacing),
              heldWindow: cleanNumber(seaShell.heldWindow),
              neighborCount: FCC_SEA_DIRECTIONS.length,
              sitesPerNeighbor: FCC_SEA_BRAID_UNIT_SITES.length,
              sourceCount: seaShell.sources.length,
              decoration:
                "face-opposite unit sites, aligned orientation, held static over the declared window",
              environmentCoupling:
                "one-way: held neighbors act on the released seed; no back-reaction on the sea (declared held histories)",
              minNonOverlapSpacing: cleanNumber(FCC_SEA_MIN_NON_OVERLAP_SPACING),
              geometryCarrierRef: "sh_0_sea_model:fcc_nearest_neighbor_shell_row",
              wakeSumSourceRowRef: "sh_0_sea_dipole_wake_sum_source:2f3aad5e6cced01f",
            },
          }
        : {}),
    },
    modelNotes: [
      "Each directed pair contributes through all detected causal roots in the retained history window.",
      "The force law uses q_i q_j r / (|r|^2 + softening^2)^(3/2), multiplied by the optional causal branch weight.",
      spinRelease.rotationActive && options.prehistoryMode === "moving-prehistory"
        ? "The hold-window source path history rotates rigidly about the normalized spin axis at the release angular rate, and the release velocity is the exact derivative of that rotating path."
        : spinRelease.rotationActive && options.prehistoryMode === "kick-at-release"
          ? "The hold window stays static and a rigid-rotation release velocity is applied at t=0, deliberately testing the mismatch between stationary causal wakes and a suddenly rotating seed."
          : norm(groupVelocity) > 0
            ? "The held prehistory is stationary in the moving center frame, with a declared group velocity through the Noether sea frame."
            : "The held prehistory is stationary from -holdTime to 0, so every initial partner wake has already crossed the seed.",
      options.includeSelfHits
        ? "Same-source causal roots are included as a priority-only toy probe and filtered to delayed roots only."
        : "Same-source self-hits are disabled in the default toy run.",
      "Architrinos are treated as primitives without physical mass; acceleration is a numerical response variable.",
      ...(seaShell
        ? [
            "Sea-screened mode: 12 held static face-opposite neighbor braids on the FCC nearest-neighbor shell contribute delayed inverse-square forces with exact static causal roots (sourceJacobian=1) and receiver-normal branch weights; the environment is one-way by declared held histories.",
          ]
        : []),
    ],
    classification,
    closureDiagnostics,
    trajectoryDiagnostics,
    reducedRadiusDiagnostics,
    ...(seaShell
      ? {
          seaShellDiagnostics: {
            claim: "diagnostic sea-screened row only; not a retained branch, stability, or accepted-evidence claim",
            releaseSeaRadialProjection: cleanNumber(releaseSeaRadialProjection),
            seaStats: {
              contributions: seaStats.contributions,
              missingHeldWindowRoots: seaStats.missingHeldWindowRoots,
              minSourceDistance: cleanNumber(seaStats.minSourceDistance),
              maxBranchWeight: cleanNumber(seaStats.maxBranchWeight),
              maxDelay: cleanNumber(seaStats.maxDelay),
            },
            seaRadialProjectionRows,
            escapeCertificateEnvelopeCaveat:
              "the delayed escape certificate envelope constant bounds partner sources only; sea-screened rows add held-environment inward force outside that envelope, so certificate margins on this row are diagnostic, not lemma-backed",
          },
        }
      : {}),
    events,
    rootStats,
    finalMetrics,
    frames,
  };
}

function createAngularMomentumRelease(options, initialParticles) {
  const spinAxisUnit = scale(options.spinAxis, 1 / norm(options.spinAxis));
  const tangentialSpeed = options.surfaceSpeedFraction * options.fieldSpeed;
  const perpendicularRadii = initialParticles.map((particle) =>
    norm(cross(spinAxisUnit, particle.position))
  );
  const referencePerpendicularRadius = Math.max(...perpendicularRadii);
  const rotationActive =
    options.prehistoryMode !== "stationary-held-release" &&
    tangentialSpeed > 0 &&
    referencePerpendicularRadius > 0;
  const angularRate = rotationActive ? tangentialSpeed / referencePerpendicularRadius : 0;
  const releaseVelocities = initialParticles.map((particle) =>
    rotationActive ? scale(cross(spinAxisUnit, particle.position), angularRate) : [0, 0, 0]
  );
  return {
    spinAxisUnit,
    tangentialSpeed,
    angularRate,
    perpendicularRadii,
    referencePerpendicularRadius,
    rotationActive,
    releaseVelocities,
    holdHistoryRepresentation: "stationary_two_row_hold_window",
    holdHistorySampleStep: null,
    holdHistoryRows: 2,
  };
}

function createHoldWindowHistory(state, options, initialParticles, groupVelocity, spinRelease) {
  if (!spinRelease.rotationActive) {
    const history = [
      snapshotState(state, -options.holdTime, {
        positions: initialParticles.map((particle) =>
          add(cloneVector(particle.position), scale(groupVelocity, -options.holdTime))
        ),
        velocities: initialParticles.map(() => cloneVector(groupVelocity)),
      }),
      snapshotState(state),
    ];
    spinRelease.holdHistoryRows = history.length;
    return history;
  }
  if (options.prehistoryMode === "kick-at-release") {
    const history = [
      snapshotState(state, -options.holdTime, {
        positions: initialParticles.map((particle) =>
          add(cloneVector(particle.position), scale(groupVelocity, -options.holdTime))
        ),
        velocities: initialParticles.map(() => cloneVector(groupVelocity)),
      }),
      snapshotState(state, 0, {
        positions: initialParticles.map((particle) => cloneVector(particle.position)),
        velocities: initialParticles.map(() => cloneVector(groupVelocity)),
      }),
      snapshotState(state),
    ];
    spinRelease.holdHistoryRepresentation = "static_hold_window_with_release_kick_row";
    spinRelease.holdHistoryRows = history.length;
    return history;
  }
  const sampleStep = Math.max(
    options.dt,
    Math.min(options.holdTime, HOLD_ROTATION_MAX_ANGLE_STEP / spinRelease.angularRate)
  );
  const rows = Math.max(1, Math.ceil(options.holdTime / sampleStep));
  const history = [];
  for (let k = 0; k < rows; k += 1) {
    const t = -options.holdTime + (k * options.holdTime) / rows;
    history.push(
      snapshotState(state, t, {
        positions: initialParticles.map((particle) =>
          add(
            scale(groupVelocity, t),
            rotateAboutAxis(particle.position, spinRelease.spinAxisUnit, spinRelease.angularRate * t)
          )
        ),
        velocities: initialParticles.map((particle) =>
          add(
            cloneVector(groupVelocity),
            scale(
              cross(
                spinRelease.spinAxisUnit,
                rotateAboutAxis(particle.position, spinRelease.spinAxisUnit, spinRelease.angularRate * t)
              ),
              spinRelease.angularRate
            )
          )
        ),
      })
    );
  }
  history.push(snapshotState(state));
  spinRelease.holdHistoryRepresentation = "rigidly_rotating_hold_window_samples";
  spinRelease.holdHistorySampleStep = options.holdTime / rows;
  spinRelease.holdHistoryRows = history.length;
  return history;
}

function computeReleaseContinuity(state, options, initialParticles, groupVelocity, spinRelease) {
  let positionJumpMax = 0;
  let velocityJumpMax = 0;
  for (let index = 0; index < initialParticles.length; index += 1) {
    const holdEndPosition =
      options.prehistoryMode === "moving-prehistory" && spinRelease.rotationActive
        ? rotateAboutAxis(initialParticles[index].position, spinRelease.spinAxisUnit, 0)
        : cloneVector(initialParticles[index].position);
    const holdEndVelocity =
      options.prehistoryMode === "moving-prehistory" && spinRelease.rotationActive
        ? add(
            cloneVector(groupVelocity),
            scale(cross(spinRelease.spinAxisUnit, holdEndPosition), spinRelease.angularRate)
          )
        : cloneVector(groupVelocity);
    positionJumpMax = Math.max(
      positionJumpMax,
      norm(subtract(state.particles[index].position, holdEndPosition))
    );
    velocityJumpMax = Math.max(
      velocityJumpMax,
      norm(subtract(state.particles[index].velocity, holdEndVelocity))
    );
  }
  return {
    positionJumpMax: cleanNumber(positionJumpMax),
    velocityJumpMax: cleanNumber(velocityJumpMax),
    intentionalReleaseKick:
      options.prehistoryMode === "kick-at-release" && spinRelease.rotationActive,
  };
}

function rotateAboutAxis(vector, axisUnit, angle) {
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const axialComponent = dot(axisUnit, vector);
  return add(
    add(scale(vector, cosAngle), scale(cross(axisUnit, vector), sinAngle)),
    scale(axisUnit, axialComponent * (1 - cosAngle))
  );
}

function createFccSeaShell(options) {
  if (options.fccSeaSpacing == null) {
    return null;
  }
  const sources = [];
  FCC_SEA_DIRECTIONS.forEach((direction, neighborIndex) => {
    const center = scale(direction, options.fccSeaSpacing / 2);
    for (const site of FCC_SEA_BRAID_UNIT_SITES) {
      sources.push({
        neighborIndex,
        q: site.q,
        position: add(center, site.offset),
      });
    }
  });
  return {
    spacing: options.fccSeaSpacing,
    heldWindow: options.fccSeaHeldWindow,
    sources,
  };
}

function evaluateSeaAccelerations(state, options, seaShell) {
  const accelerations = state.particles.map(() => [0, 0, 0]);
  const stats = {
    contributions: 0,
    missingHeldWindowRoots: 0,
    minSourceDistance: Infinity,
    maxBranchWeight: 0,
    maxDelay: 0,
  };
  for (let i = 0; i < state.particles.length; i += 1) {
    const receiver = state.particles[i];
    for (const source of seaShell.sources) {
      // Held static source: the causal root is exact and unique
      // (emissionTime = hitTime - distance / fieldSpeed), sourceJacobian = 1.
      const displacement = subtract(receiver.position, source.position);
      const distance = norm(displacement);
      const delay = distance / options.fieldSpeed;
      if (state.time - delay < -seaShell.heldWindow) {
        stats.missingHeldWindowRoots += 1;
        continue;
      }
      stats.contributions += 1;
      stats.minSourceDistance = Math.min(stats.minSourceDistance, distance);
      stats.maxDelay = Math.max(stats.maxDelay, delay);
      const direction = distance > 0 ? scale(displacement, 1 / distance) : [0, 0, 0];
      const receiverNormalFactor =
        (options.fieldSpeed - dot(receiver.velocity, direction)) / options.fieldSpeed;
      const branchWeight = options.causalWeight ? Math.abs(receiverNormalFactor) : 1;
      stats.maxBranchWeight = Math.max(stats.maxBranchWeight, branchWeight);
      const denominator = Math.pow(
        distance * distance + options.softening * options.softening,
        1.5
      );
      const coefficient = (options.coupling * receiver.q * source.q * branchWeight) / denominator;
      accelerations[i] = add(accelerations[i], scale(displacement, coefficient));
    }
  }
  const center = meanVector(state.particles.map((particle) => particle.position));
  let radialProjectionSum = 0;
  for (let i = 0; i < state.particles.length; i += 1) {
    const offset = subtract(state.particles[i].position, center);
    const radius = norm(offset);
    radialProjectionSum += radius > 0 ? dot(offset, accelerations[i]) / radius : 0;
  }
  return {
    accelerations,
    stats,
    radialProjection: cleanNumber(radialProjectionSum / state.particles.length),
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
  const declaredCenter = scale(options.groupVelocity, state.time);
  const centerVelocity = meanVector(state.particles.map((particle) => particle.velocity));
  const radii = state.particles.map((particle) => norm(subtract(particle.position, center)));
  const speeds = state.particles.map((particle) => norm(particle.velocity));
  const relativeVelocities = state.particles.map((particle) => subtract(particle.velocity, centerVelocity));
  const relativeSpeeds = relativeVelocities.map((velocity) => norm(velocity));
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
    state.particles.map((particle, index) => {
      const offset = subtract(particle.position, center);
      const radius = norm(offset);
      return radius > 0 ? dot(offset, relativeVelocities[index]) / radius : 0;
    })
  );
  const particleBySite = new Map(state.particles.map((particle) => [particle.site, particle]));
  let fixedPointCyclicPositionResidual = 0;
  let fixedPointCyclicVelocityResidual = 0;
  for (const particle of state.particles) {
    const image = particleBySite.get(CYCLIC_SITE_MAP[particle.site]);
    fixedPointCyclicPositionResidual = Math.max(
      fixedPointCyclicPositionResidual,
      norm(
        subtract(
          subtract(image.position, center),
          cyclicPermuteVector(subtract(particle.position, center))
        )
      )
    );
    fixedPointCyclicVelocityResidual = Math.max(
      fixedPointCyclicVelocityResidual,
      norm(
        subtract(
          subtract(image.velocity, centerVelocity),
          cyclicPermuteVector(subtract(particle.velocity, centerVelocity))
        )
      )
    );
  }
  return {
    time: cleanNumber(state.time),
    center: cleanVector(center),
    declaredCenter: cleanVector(declaredCenter),
    centerDriftResidual: cleanNumber(norm(subtract(center, declaredCenter))),
    centerVelocity: cleanVector(centerVelocity),
    groupSpeed: cleanNumber(norm(centerVelocity)),
    radiusMean: cleanNumber(mean(radii)),
    radiusStd: cleanNumber(stddev(radii)),
    speedMean: cleanNumber(mean(speeds)),
    speedStd: cleanNumber(stddev(speeds)),
    speedMax: cleanNumber(Math.max(...speeds)),
    relativeSpeedMean: cleanNumber(mean(relativeSpeeds)),
    relativeSpeedStd: cleanNumber(stddev(relativeSpeeds)),
    relativeSpeedMax: cleanNumber(Math.max(...relativeSpeeds)),
    minSameDistance: cleanNumber(Math.min(...sameDistances)),
    minOppositeDistance: cleanNumber(Math.min(...oppositeDistances)),
    pairOppositionMean: cleanNumber(mean(pairedOppositionErrors)),
    pairOppositionMax: cleanNumber(Math.max(...pairedOppositionErrors)),
    radialVelocityMean: cleanNumber(radialVelocityMean),
    fixedPointCyclicPositionResidual: cleanNumber(fixedPointCyclicPositionResidual),
    fixedPointCyclicVelocityResidual: cleanNumber(fixedPointCyclicVelocityResidual),
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
    centerDriftResidual: finalMetrics.centerDriftResidual,
    radiusStd: finalMetrics.radiusStd,
    speedStd: finalMetrics.relativeSpeedStd,
    absoluteSpeedStd: finalMetrics.speedStd,
    pairOppositionMax: finalMetrics.pairOppositionMax,
    centerVelocity: finalMetrics.centerVelocity,
    groupSpeed: finalMetrics.groupSpeed,
  };
  const groupVelocityActive = norm(options.groupVelocity) > 0;
  const centerResidualPass = groupVelocityActive
    ? Number.isFinite(symmetryResiduals.centerDriftResidual)
    : symmetryResiduals.centerNorm <= TOY_CLOSURE_THRESHOLDS.centerNorm;
  const symmetryResidualPass =
    centerResidualPass &&
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
    : options.preset === "axial-paired"
      ? "same_level_support_lost_in_toy_control"
      : "same_level_support_lost_in_translating_toy_window";

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
      centerResidualPass,
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
      maxCenterDriftResidual: null,
      maxSpeedStd: null,
      maxRelativeSpeedStd: null,
      maxPairOppositionMax: null,
      maxFieldSpeedRatio: null,
      minSameDistance: null,
      minOppositeDistance: null,
      maxFixedPointCyclicPositionResidual: null,
      maxFixedPointCyclicVelocityResidual: null,
    },
    previousRadialSign: 0,
    previousRadialVelocityMean: 0,
    radialTurnRows: [],
    radialSignSequence: [],
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
  updateExtremum(accumulator.extrema, "maxCenterDriftResidual", metrics, "centerDriftResidual", "max", state);
  updateExtremum(accumulator.extrema, "maxSpeedStd", metrics, "speedStd", "max", state);
  updateExtremum(accumulator.extrema, "maxRelativeSpeedStd", metrics, "relativeSpeedStd", "max", state);
  updateExtremum(accumulator.extrema, "maxPairOppositionMax", metrics, "pairOppositionMax", "max", state);
  updateExtremum(accumulator.extrema, "maxFieldSpeedRatio", metrics, "fieldSpeedRatioMax", "max", state);
  updateExtremum(accumulator.extrema, "minSameDistance", metrics, "minSameDistance", "min", state);
  updateExtremum(accumulator.extrema, "minOppositeDistance", metrics, "minOppositeDistance", "min", state);
  updateExtremum(
    accumulator.extrema,
    "maxFixedPointCyclicPositionResidual",
    metrics,
    "fixedPointCyclicPositionResidual",
    "max",
    state
  );
  updateExtremum(
    accumulator.extrema,
    "maxFixedPointCyclicVelocityResidual",
    metrics,
    "fixedPointCyclicVelocityResidual",
    "max",
    state
  );
  recordRadialAccelerationSample(accumulator, metrics, state);

  const radialSign = signWithDeadband(metrics.radialVelocityMean, TOY_CLOSURE_THRESHOLDS.radialTurnEpsilon);
  if (radialSign !== 0) {
    if (radialSign !== accumulator.previousRadialSign) {
      accumulator.radialSignSequence.push({
        sign: radialSign > 0 ? "outward" : "inward",
        time: cleanNumber(metrics.time),
        stepIndex: state.stepIndex,
      });
    }
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

function createTrajectoryDiagnostics({ options, events, rootStats, trajectoryAccumulator, spinRelease }) {
  const extrema = cleanExtrema(trajectoryAccumulator.extrema);
  const fixedPointGroupApplicable = options.preset === "face-opposite";
  const fixedPointDrift = {
    group: fixedPointGroupApplicable
      ? spinRelease.rotationActive
        ? "C3_x_inversion_axis_neutral_rotating"
        : "S3_x_inversion_zero_angular_momentum"
      : "not_applicable_to_preset",
    applicable: fixedPointGroupApplicable,
    cyclicPositionResidualMax: extrema.maxFixedPointCyclicPositionResidual,
    cyclicVelocityResidualMax: extrema.maxFixedPointCyclicVelocityResidual,
    pairOppositionResidualMax: extrema.maxPairOppositionMax,
    residualMax: cleanNumber(
      Math.max(
        extrema.maxFixedPointCyclicPositionResidual.value ?? 0,
        extrema.maxFixedPointCyclicVelocityResidual.value ?? 0,
        extrema.maxPairOppositionMax.value ?? 0
      )
    ),
    note: "fixed_point_drift_is_a_runner_or_root_selection_defect_not_a_physical_signal",
  };
  const windowResiduals = {
    centerNormMax: extrema.maxCenterNorm.value,
    centerDriftResidualMax: extrema.maxCenterDriftResidual.value,
    radiusStdMax: extrema.maxRadiusStd.value,
    speedStdMax: extrema.maxRelativeSpeedStd.value,
    absoluteSpeedStdMax: extrema.maxSpeedStd.value,
    pairOppositionMax: extrema.maxPairOppositionMax.value,
  };
  const groupVelocityActive = norm(options.groupVelocity) > 0;
  const centerWindowPass = groupVelocityActive
    ? Number.isFinite(windowResiduals.centerDriftResidualMax)
    : windowResiduals.centerNormMax <= TOY_CLOSURE_THRESHOLDS.centerNorm;
  const symmetryWindowPass =
    centerWindowPass &&
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
    fixedPointDrift,
    radialTurnRows: trajectoryAccumulator.radialTurnRows,
    radialSignSequence: trajectoryAccumulator.radialSignSequence,
    firstCompressionToExpansionTurn,
    firstExpansionToCompressionTurnAfterFirstExpansion,
    checks: {
      symmetryWindowPass,
      centerWindowPass,
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
    radialSignSequence: trajectoryAccumulator.radialSignSequence,
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
  if (!events.firstSelfHitRoot && accelerationResult.rootStats.selfHitRoots > 0) {
    events.firstSelfHitRoot = {
      time: cleanNumber(state.time),
      stepIndex: state.stepIndex,
      selfHitRoots: accelerationResult.rootStats.selfHitRoots,
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
    "relativeSpeedMean",
    "speedMax",
    "relativeSpeedMax",
    "groupSpeed",
    "centerDriftResidual",
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
    ...(result.seaShellDiagnostics ? { seaShellDiagnostics: result.seaShellDiagnostics } : {}),
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

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function cyclicPermuteVector(v) {
  return [v[2], v[0], v[1]];
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

function vector3(value, name) {
  const parts = value.split(",").map((part) => finiteNumber(part.trim(), name));
  if (parts.length !== 3) {
    throw new TypeError(`${name} must be three comma-separated finite numbers`);
  }
  return parts;
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
  --group-velocity <x,y,z>     center drift through the Noether sea frame, default 0,0,0
  --max-acceleration <number>  optional acceleration cap
  --include-self-hits          include delayed same-source roots as a priority-only toy probe
  --self-hit-min-delay <num>   minimum delayed self-hit root delay, default dt
  --no-causal-weight           disable causal branch weighting
  --surface-speed-fraction <f> tangential surface-speed fraction f_v with v_t = f_v * c_f, default 0
  --spin-axis <x,y,z>          spin axis, normalized internally, default 1,1,1 (axis-neutral)
  --prehistory-mode <mode>     one of ${PREHISTORY_MODES.join("|")},
                               default stationary-held-release
  --fcc-sea-spacing <a>        activate the sea-screened mode: 12 held static face-opposite
                               neighbor braids on the FCC nearest-neighbor shell at lattice
                               spacing a (must be >= 2*sqrt(2)); default off
  --fcc-sea-held-window <W>    declared held-history window for the sea sources, default 24
  --out <path>                 output directory, default ${DEFAULT_OUTPUT_DIR}
`);
  process.exit(exitCode);
}
