#!/usr/bin/env node

// Priority-only, test-charge diagnostic for `interior_field_ponderomotive_diagnostic`
// (braid-ideal Group A). Computes the superposed delayed potential and its
// gradient as they would act on a hypothetical static receiver near the
// axis-neutral rotating 120-degree-phased channel of the six-point lemma:
//
//   - axial profile of the superposed delayed potential gradient along n_hat,
//   - off-axis oscillatory gradient amplitude on the rotating channel,
//   - time-averaged ponderomotive effective potential from the high-cadence
//     harmonics (unit numerical integration weight; architrino primitives
//     carry no physical mass),
//   - trap-minimum search with sampled-domain escape level and trap depth,
//   - trap depth versus accessory mutual repulsion at candidate spacings on
//     the C3-compatible loci (on-axis stack, staggered 120-degree rings),
//   - delayed check of the leading-order polarity-sorting conclusion.
//
// Strict potential-superposition terminology: every quantity here is a
// superposed delayed potential or its gradient evaluated at a probe point,
// never a field ontology claim. Delays run at field speed c_f on the exact
// rotating worldlines (idealized steady rotating channel; no finite memory
// window). Fail-closed: no retained-branch claim, no accepted-evidence claim,
// no weak-channel claim, no score movement.
//
// Channel: six architrino sites, signed polarity units epsilon_{+,x|y|z}
// (positrinos, sigma=+1) and epsilon_{-,x|y|z} (electrinos, sigma=-1), on the
// face-opposite seed rotating rigidly about n_hat=(1,1,1)/sqrt(3), per the
// six-point symmetry invariant lemma proof packet.

import fs from "node:fs";
import path from "node:path";

const N_HAT = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printUsage(0);
}

const report = runDiagnostic(options);
const serialized = JSON.stringify(report, null, options.pretty ? 2 : 0);
if (options.outPath) {
  fs.mkdirSync(path.dirname(path.resolve(options.outPath)), { recursive: true });
  fs.writeFileSync(options.outPath, `${serialized}\n`);
}
console.log(serialized);

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
    fieldSpeed: 1,
    radius: 1,
    coupling: 1,
    softening: 0.05,
    jacobianFloor: 0.05,
    surfaceSpeedFractions: [0.3, 0.6, 0.9],
    timeSamples: 60,
    axialSamples: 81,
    axialExtent: 2,
    gridRhoSamples: 21,
    gridRhoMax: 1.3,
    gridZSamples: 41,
    gridZExtent: 1.6,
    candidateSpacings: [0.1, 0.15, 0.2, 0.3, 0.4, 0.6, 0.8],
    outPath: null,
    pretty: false,
  };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
    } else if (arg === "--field-speed") {
      parsed.fieldSpeed = positiveFiniteNumber(requireNext(rawArgs, index, arg), "field-speed");
      index += 1;
    } else if (arg === "--radius") {
      parsed.radius = positiveFiniteNumber(requireNext(rawArgs, index, arg), "radius");
      index += 1;
    } else if (arg === "--coupling") {
      parsed.coupling = positiveFiniteNumber(requireNext(rawArgs, index, arg), "coupling");
      index += 1;
    } else if (arg === "--softening") {
      parsed.softening = positiveFiniteNumber(requireNext(rawArgs, index, arg), "softening");
      index += 1;
    } else if (arg === "--jacobian-floor") {
      parsed.jacobianFloor = positiveFiniteNumber(requireNext(rawArgs, index, arg), "jacobian-floor");
      index += 1;
    } else if (arg === "--surface-speed-fractions") {
      parsed.surfaceSpeedFractions = numberList(requireNext(rawArgs, index, arg), "surface-speed-fractions");
      index += 1;
    } else if (arg === "--time-samples") {
      parsed.timeSamples = positiveInteger(requireNext(rawArgs, index, arg), "time-samples");
      index += 1;
    } else if (arg === "--axial-samples") {
      parsed.axialSamples = positiveInteger(requireNext(rawArgs, index, arg), "axial-samples");
      index += 1;
    } else if (arg === "--axial-extent") {
      parsed.axialExtent = positiveFiniteNumber(requireNext(rawArgs, index, arg), "axial-extent");
      index += 1;
    } else if (arg === "--grid-rho-samples") {
      parsed.gridRhoSamples = positiveInteger(requireNext(rawArgs, index, arg), "grid-rho-samples");
      index += 1;
    } else if (arg === "--grid-rho-max") {
      parsed.gridRhoMax = positiveFiniteNumber(requireNext(rawArgs, index, arg), "grid-rho-max");
      index += 1;
    } else if (arg === "--grid-z-samples") {
      parsed.gridZSamples = positiveInteger(requireNext(rawArgs, index, arg), "grid-z-samples");
      index += 1;
    } else if (arg === "--grid-z-extent") {
      parsed.gridZExtent = positiveFiniteNumber(requireNext(rawArgs, index, arg), "grid-z-extent");
      index += 1;
    } else if (arg === "--candidate-spacings") {
      parsed.candidateSpacings = numberList(requireNext(rawArgs, index, arg), "candidate-spacings");
      index += 1;
    } else if (arg === "--out") {
      parsed.outPath = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else {
      throw new TypeError(`Unknown argument: ${arg}`);
    }
  }
  for (const beta of parsed.surfaceSpeedFractions) {
    if (!(beta > 0 && beta < 1)) {
      throw new TypeError(
        `--surface-speed-fractions entries must lie in (0,1) for the sub-field-speed channel; got ${beta}`
      );
    }
  }
  return parsed;
}

function runDiagnostic(options) {
  const rows = options.surfaceSpeedFractions.map((beta) => evaluateChannelRow(beta, options));
  const supportedRow = rows.find((row) => row.mechanismComparison.supportedAtSomeCandidateSpacing);
  const mechanismSupported = supportedRow != null;
  const firstBlocker = mechanismSupported
    ? "test_charge_diagnostic_only_no_retained_branch_no_accepted_evidence"
    : firstPresent([
        [
          rows.every((row) => row.trapAnalysis.epsilonMinus.trapMinimumExists !== true),
          "no_interior_trap_minimum_on_sampled_domain",
        ],
        [true, "trap_depth_below_accessory_mutual_repulsion_at_all_candidate_spacings"],
      ]);
  return {
    schema: "braid-ideal-interior-axial-potential-gradient-diagnostic.v1",
    createdAt: new Date().toISOString(),
    status: "priority_only_test_charge_diagnostic",
    owningQueueItem: "interior_field_ponderomotive_diagnostic",
    owningStructuralSlot:
      "central_inventory_inside_hollow_support:reference/priorities/braid-archive/braid-retained-branch-closure/priorities.md",
    channelProofRef:
      "priority-proof-packet:reference/priorities/braid-archive/braid-ideal/six-point-symmetry-invariant-lemma-proof-packet.md",
    terminology:
      "superposed delayed potential and gradient at a hypothetical static receiver; potential-superposition only, no field ontology",
    priorityOnly: true,
    testChargeLevel: true,
    retainedBranchClaim: false,
    acceptedEvidenceClaim: false,
    weakChannelClaim: false,
    scoreMovement: "no_score_increase",
    configuration: {
      fieldSpeed: options.fieldSpeed,
      radius: options.radius,
      coupling: options.coupling,
      softening: options.softening,
      jacobianFloor: options.jacobianFloor,
      timeSamples: options.timeSamples,
      axialSamples: options.axialSamples,
      axialExtent: options.axialExtent,
      gridRhoSamples: options.gridRhoSamples,
      gridRhoMax: options.gridRhoMax,
      gridZSamples: options.gridZSamples,
      gridZExtent: options.gridZExtent,
      candidateSpacings: options.candidateSpacings,
      ponderomotiveWeightConvention:
        "unit numerical integration weight per solver convention; architrino primitives carry no physical mass",
      delayModel:
        "idealized steady rotating channel; causal roots solved on the exact rotating worldlines at field speed c_f",
    },
    channelRows: rows,
    mechanismDecision: mechanismSupported
      ? "ponderomotive_accessory_confinement_supported_diagnostic_only"
      : "ponderomotive_accessory_confinement_disfavored_origin_cluster_repulsion_objection_reinstated",
    mechanismSupportedAtRow: supportedRow
      ? {
          surfaceSpeedFraction: supportedRow.surfaceSpeedFraction,
          firstSupportedComparison: supportedRow.mechanismComparison.rows.find((row) => row.supported) ?? null,
        }
      : null,
    firstBlocker,
    missingAcceptedFields: [
      "central_solver_retained_history_row",
      "same_record_causal_root_replay",
      "accessory_receiver_backreaction_rows",
      "retained_branch_certificate",
    ],
  };
}

function evaluateChannelRow(beta, options) {
  const radius = options.radius;
  const leverArm = radius * Math.sqrt(2 / 3);
  const axialHeight = radius / Math.sqrt(3);
  const omega = (beta * options.fieldSpeed) / leverArm;
  const period = (2 * Math.PI) / omega;
  const sources = channelSources(radius);
  const context = { options, sources, omega, beta };

  // Axial profile along n_hat (rho = 0).
  const axialProfile = [];
  for (let index = 0; index < options.axialSamples; index += 1) {
    const z = -options.axialExtent + (2 * options.axialExtent * index) / (options.axialSamples - 1);
    axialProfile.push(evaluateProbePoint(0, z, period, context));
  }
  const onAxisOscillatoryAmplitudeMax = Math.max(
    ...axialProfile.map((row) => row.oscillatoryGradientAmplitudeRms)
  );

  // Interior polarity-sorting check on the open interior axis (|z| < R/sqrt(3)).
  const interiorRows = axialProfile.filter((row) => Math.abs(row.z) < axialHeight * 0.999);
  const interiorAxialGradientMin = Math.min(...interiorRows.map((row) => row.meanAxialGradient));
  const polaritySorting = {
    statement:
      "mean delayed axial potential gradient positive on the interior axis pushes epsilon_- toward the positrino face (+n_hat) and epsilon_+ toward the electrino face (-n_hat), via acceleration = -sigma_receiver * gradient",
    interiorAxialGradientMin: cleanNumber(interiorAxialGradientMin),
    interiorAxialGradientAtCenter: cleanNumber(
      axialProfile[Math.floor(options.axialSamples / 2)].meanAxialGradient
    ),
    pushesEpsilonMinusTowardPositrinoFace: interiorAxialGradientMin > 0,
    pushesEpsilonPlusTowardElectrinoFace: interiorAxialGradientMin > 0,
    leadingOrderConclusionSurvivesDelayedComputation: interiorAxialGradientMin > 0,
  };

  // (rho, z) half-plane grid; azimuth-independent after time averaging on the
  // rotating channel, so one meridian half-plane suffices.
  const rhoValues = [];
  for (let index = 0; index < options.gridRhoSamples; index += 1) {
    rhoValues.push((options.gridRhoMax * index) / (options.gridRhoSamples - 1));
  }
  const zValues = [];
  for (let index = 0; index < options.gridZSamples; index += 1) {
    zValues.push(-options.gridZExtent + (2 * options.gridZExtent * index) / (options.gridZSamples - 1));
  }
  const gridRows = [];
  for (const rho of rhoValues) {
    for (const z of zValues) {
      gridRows.push(evaluateProbePoint(rho, z, period, context));
    }
  }

  const trapMinus = analyzeTrap(gridRows, rhoValues, zValues, "uEffEpsilonMinus", options);
  const trapPlus = analyzeTrap(gridRows, rhoValues, zValues, "uEffEpsilonPlus", options);

  const mechanismComparison = compareAgainstAccessoryRepulsion(trapMinus, period, context);

  return {
    surfaceSpeedFraction: beta,
    omega: cleanNumber(omega),
    rotationPeriod: cleanNumber(period),
    cadenceNote:
      "C3 phasing makes the superposed delayed potential periodic with fundamental cadence 3*omega at fixed probe points; harmonics measured against the rotation period",
    channelGeometry: {
      axialHeight: cleanNumber(axialHeight),
      leverArm: cleanNumber(leverArm),
      positrinoFaceDirection: "+n_hat",
      electrinoFaceDirection: "-n_hat",
    },
    onAxisStaticityResidual: cleanNumber(onAxisOscillatoryAmplitudeMax),
    onAxisStaticityHolds: onAxisOscillatoryAmplitudeMax < 1e-8,
    axialProfile: axialProfile.map(compactProfileRow),
    offAxisRows: gridRows.map(compactGridRow),
    polaritySorting,
    trapAnalysis: {
      epsilonMinus: trapMinus,
      epsilonPlus: trapPlus,
      iotaMirrorNote:
        "the iota symmetry maps the epsilon_- effective landscape to the epsilon_+ landscape under z -> -z; both are reported",
    },
    mechanismComparison,
  };
}

function channelSources(radius) {
  const seeds = [
    { label: "epsilon_plus_x", sigma: 1, seed: [radius, 0, 0] },
    { label: "epsilon_plus_y", sigma: 1, seed: [0, radius, 0] },
    { label: "epsilon_plus_z", sigma: 1, seed: [0, 0, radius] },
    { label: "epsilon_minus_x", sigma: -1, seed: [-radius, 0, 0] },
    { label: "epsilon_minus_y", sigma: -1, seed: [0, -radius, 0] },
    { label: "epsilon_minus_z", sigma: -1, seed: [0, 0, -radius] },
  ];
  return seeds;
}

// Rodrigues rotation of a seed position about n_hat by angle theta.
function rotatedPosition(seed, theta) {
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const dot = seed[0] * N_HAT[0] + seed[1] * N_HAT[1] + seed[2] * N_HAT[2];
  const cross = [
    N_HAT[1] * seed[2] - N_HAT[2] * seed[1],
    N_HAT[2] * seed[0] - N_HAT[0] * seed[2],
    N_HAT[0] * seed[1] - N_HAT[1] * seed[0],
  ];
  return [
    seed[0] * cos + cross[0] * sin + N_HAT[0] * dot * (1 - cos),
    seed[1] * cos + cross[1] * sin + N_HAT[1] * dot * (1 - cos),
    seed[2] * cos + cross[2] * sin + N_HAT[2] * dot * (1 - cos),
  ];
}

function sourceState(source, time, omega) {
  const position = rotatedPosition(source.seed, omega * time);
  const velocity = [
    omega * (N_HAT[1] * position[2] - N_HAT[2] * position[1]),
    omega * (N_HAT[2] * position[0] - N_HAT[0] * position[2]),
    omega * (N_HAT[0] * position[1] - N_HAT[1] * position[0]),
  ];
  return { position, velocity };
}

// Safeguarded Newton root solve for the unique causal root of one source at a
// static probe point: ||p - X(t)|| = c_f (T - t), monotone under beta < 1.
function causalRootTime(point, source, absoluteTime, context) {
  const { options, omega } = context;
  const cf = options.fieldSpeed;
  const residual = (t) => {
    const state = sourceState(source, t, omega);
    const dx = point[0] - state.position[0];
    const dy = point[1] - state.position[1];
    const dz = point[2] - state.position[2];
    return Math.hypot(dx, dy, dz) - cf * (absoluteTime - t);
  };
  const pointNorm = Math.hypot(point[0], point[1], point[2]);
  let low = absoluteTime - ((pointNorm + Math.hypot(...source.seed)) / cf + 1);
  let high = absoluteTime;
  let t = absoluteTime - residual(absoluteTime) / cf;
  for (let iteration = 0; iteration < 80; iteration += 1) {
    if (!(t > low && t < high)) {
      t = 0.5 * (low + high);
    }
    const state = sourceState(source, t, omega);
    const dx = point[0] - state.position[0];
    const dy = point[1] - state.position[1];
    const dz = point[2] - state.position[2];
    const distance = Math.hypot(dx, dy, dz);
    const value = distance - cf * (absoluteTime - t);
    if (Math.abs(value) < 1e-13) {
      return t;
    }
    if (value > 0) {
      high = t;
    } else {
      low = t;
    }
    const slope =
      cf - (distance > 0 ? (dx * state.velocity[0] + dy * state.velocity[1] + dz * state.velocity[2]) / distance : 0);
    t = slope > 0 ? t - value / slope : 0.5 * (low + high);
  }
  return 0.5 * (low + high);
}

// Superposed delayed potential at one probe point and absolute time, with the
// receiver-normal numerator of a static receiver and the sign-preserving
// source-normal Jacobian floor of the shared kernel convention.
function delayedPotential(point, absoluteTime, context) {
  const { options, sources, omega } = context;
  const cf = options.fieldSpeed;
  let potential = 0;
  for (const source of sources) {
    const rootTime = causalRootTime(point, source, absoluteTime, context);
    const state = sourceState(source, rootTime, omega);
    const dx = point[0] - state.position[0];
    const dy = point[1] - state.position[1];
    const dz = point[2] - state.position[2];
    const distance = Math.hypot(dx, dy, dz);
    const sourceNormalSpeed =
      distance > 0 ? (dx * state.velocity[0] + dy * state.velocity[1] + dz * state.velocity[2]) / distance : 0;
    const sourceJacobian = (cf - sourceNormalSpeed) / cf;
    const clampedSourceJacobian = signPreservingMax(sourceJacobian, options.jacobianFloor);
    const receiverNormalFactor = 1; // static hypothetical receiver
    const branchWeight = Math.abs(receiverNormalFactor / clampedSourceJacobian);
    potential +=
      (options.coupling * source.sigma * branchWeight) /
      Math.sqrt(distance * distance + options.softening * options.softening);
  }
  return potential;
}

function delayedPotentialGradient(point, absoluteTime, context) {
  const step = 1e-5 * context.options.radius;
  const gradient = [0, 0, 0];
  for (let axis = 0; axis < 3; axis += 1) {
    const forward = [...point];
    const backward = [...point];
    forward[axis] += step;
    backward[axis] -= step;
    gradient[axis] =
      (delayedPotential(forward, absoluteTime, context) - delayedPotential(backward, absoluteTime, context)) /
      (2 * step);
  }
  return gradient;
}

// One probe point on the meridian half-plane: time-mean potential and
// gradient, oscillatory amplitude, harmonic decomposition, ponderomotive
// effective potential, and signed effective landscapes.
function evaluateProbePoint(rho, z, period, context) {
  const { options, omega } = context;
  const e1 = [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0]; // unit vector orthogonal to n_hat
  const point = [
    rho * e1[0] + z * N_HAT[0],
    rho * e1[1] + z * N_HAT[1],
    rho * e1[2] + z * N_HAT[2],
  ];
  const samples = options.timeSamples;
  const potentials = new Array(samples);
  const gradients = new Array(samples);
  for (let index = 0; index < samples; index += 1) {
    const time = (period * index) / samples;
    potentials[index] = delayedPotential(point, time, context);
    gradients[index] = delayedPotentialGradient(point, time, context);
  }
  const meanPotential = potentials.reduce((sum, value) => sum + value, 0) / samples;
  const meanGradient = [0, 1, 2].map(
    (axis) => gradients.reduce((sum, gradient) => sum + gradient[axis], 0) / samples
  );
  let oscillatorySquaredSum = 0;
  for (const gradient of gradients) {
    for (let axis = 0; axis < 3; axis += 1) {
      const residual = gradient[axis] - meanGradient[axis];
      oscillatorySquaredSum += residual * residual;
    }
  }
  const oscillatoryGradientAmplitudeRms = Math.sqrt(oscillatorySquaredSum / samples);

  // Discrete Fourier harmonics of the gradient against the rotation period;
  // ponderomotive effective potential with unit numerical integration weight:
  // U_p = sum_k |G_k|^2 / (4 (k omega)^2).
  let ponderomotive = 0;
  const harmonicCap = Math.floor(samples / 2);
  const dominantHarmonics = [];
  for (let harmonic = 1; harmonic < harmonicCap; harmonic += 1) {
    let squaredAmplitude = 0;
    for (let axis = 0; axis < 3; axis += 1) {
      let cosSum = 0;
      let sinSum = 0;
      for (let index = 0; index < samples; index += 1) {
        const phase = (2 * Math.PI * harmonic * index) / samples;
        cosSum += gradients[index][axis] * Math.cos(phase);
        sinSum += gradients[index][axis] * Math.sin(phase);
      }
      const a = (2 / samples) * cosSum;
      const b = (2 / samples) * sinSum;
      squaredAmplitude += a * a + b * b;
    }
    if (squaredAmplitude > 0) {
      ponderomotive += squaredAmplitude / (4 * (harmonic * omega) ** 2);
      dominantHarmonics.push({ harmonic, squaredAmplitude });
    }
  }
  dominantHarmonics.sort((left, right) => right.squaredAmplitude - left.squaredAmplitude);
  // Quiver-amplitude validity estimate for the time-averaged description.
  let quiverAmplitude = 0;
  for (const { harmonic, squaredAmplitude } of dominantHarmonics) {
    quiverAmplitude += Math.sqrt(squaredAmplitude) / (harmonic * omega) ** 2;
  }
  return {
    rho: cleanNumber(rho),
    z: cleanNumber(z),
    meanPotential: cleanNumber(meanPotential),
    meanAxialGradient: cleanNumber(
      meanGradient[0] * N_HAT[0] + meanGradient[1] * N_HAT[1] + meanGradient[2] * N_HAT[2]
    ),
    meanTransverseGradient: cleanNumber(
      meanGradient[0] * e1[0] + meanGradient[1] * e1[1] + meanGradient[2] * e1[2]
    ),
    oscillatoryGradientAmplitudeRms: cleanNumber(oscillatoryGradientAmplitudeRms),
    dominantHarmonic: dominantHarmonics.length > 0 ? dominantHarmonics[0].harmonic : null,
    ponderomotivePotential: cleanNumber(ponderomotive),
    quiverAmplitude: cleanNumber(quiverAmplitude),
    uEffEpsilonMinus: cleanNumber(-meanPotential + ponderomotive),
    uEffEpsilonPlus: cleanNumber(meanPotential + ponderomotive),
  };
}

function compactProfileRow(row) {
  return {
    z: row.z,
    meanPotential: row.meanPotential,
    meanAxialGradient: row.meanAxialGradient,
    oscillatoryGradientAmplitudeRms: row.oscillatoryGradientAmplitudeRms,
    ponderomotivePotential: row.ponderomotivePotential,
  };
}

function compactGridRow(row) {
  return {
    rho: row.rho,
    z: row.z,
    meanPotential: row.meanPotential,
    oscillatoryGradientAmplitudeRms: row.oscillatoryGradientAmplitudeRms,
    ponderomotivePotential: row.ponderomotivePotential,
    quiverAmplitude: row.quiverAmplitude,
    uEffEpsilonMinus: row.uEffEpsilonMinus,
    uEffEpsilonPlus: row.uEffEpsilonPlus,
  };
}

// Trap analysis on the sampled (rho, z) landscape: interior local minima,
// watershed escape level to the open boundary (rho = rho_max or |z| = z_max;
// the axis rho = 0 is a symmetry locus, not an escape boundary), and depth.
function analyzeTrap(gridRows, rhoValues, zValues, key, options) {
  const rhoCount = rhoValues.length;
  const zCount = zValues.length;
  const value = (i, j) => gridRows[i * zCount + j][key];
  const minima = [];
  for (let i = 0; i < rhoCount; i += 1) {
    for (let j = 1; j < zCount - 1; j += 1) {
      if (i === rhoCount - 1) {
        continue; // boundary column
      }
      const center = value(i, j);
      let isMinimum = true;
      for (let di = -1; di <= 1 && isMinimum; di += 1) {
        for (let dj = -1; dj <= 1 && isMinimum; dj += 1) {
          if (di === 0 && dj === 0) {
            continue;
          }
          const ni = Math.abs(i + di); // reflect across the axis at rho = 0
          if (ni >= rhoCount) {
            continue;
          }
          if (value(ni, j + dj) < center) {
            isMinimum = false;
          }
        }
      }
      if (isMinimum) {
        minima.push({ i, j, rho: rhoValues[i], z: zValues[j], uEff: center });
      }
    }
  }
  if (minima.length === 0) {
    return {
      trapMinimumExists: false,
      trapMinimum: null,
      escapeLevel: null,
      trapDepth: null,
      quiverValidityAtMinimum: null,
      firstBlocker: "no_interior_local_minimum_on_sampled_domain",
    };
  }
  const globalMinimum = minima.reduce((best, candidate) => (candidate.uEff < best.uEff ? candidate : best));

  // Watershed: activate cells in ascending value order; escape level is the
  // activation value at which the minimum's component first reaches the open
  // boundary.
  const cellCount = rhoCount * zCount;
  const parent = new Array(cellCount + 1).fill(0).map((_, index) => index);
  const boundaryNode = cellCount;
  const find = (a) => {
    let root = a;
    while (parent[root] !== root) {
      root = parent[root];
    }
    while (parent[a] !== root) {
      const next = parent[a];
      parent[a] = root;
      a = next;
    }
    return root;
  };
  const union = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
    }
  };
  const order = [];
  for (let i = 0; i < rhoCount; i += 1) {
    for (let j = 0; j < zCount; j += 1) {
      order.push({ i, j, value: value(i, j) });
    }
  }
  order.sort((left, right) => left.value - right.value);
  const active = new Array(cellCount).fill(false);
  const cellId = (i, j) => i * zCount + j;
  const minimumId = cellId(globalMinimum.i, globalMinimum.j);
  let escapeLevel = null;
  for (const cell of order) {
    const id = cellId(cell.i, cell.j);
    active[id] = true;
    if (cell.i === rhoCount - 1 || cell.j === 0 || cell.j === zCount - 1) {
      union(id, boundaryNode);
    }
    for (const [di, dj] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const ni = cell.i + di;
      const nj = cell.j + dj;
      if (ni < 0 || ni >= rhoCount || nj < 0 || nj >= zCount) {
        continue;
      }
      const neighborId = cellId(ni, nj);
      if (active[neighborId]) {
        union(id, neighborId);
      }
    }
    if (find(minimumId) === find(boundaryNode)) {
      escapeLevel = cell.value;
      break;
    }
  }
  const trapDepth = escapeLevel == null ? null : escapeLevel - globalMinimum.uEff;
  const minimumRow = gridRows[minimumId];
  const quiverValid = minimumRow.quiverAmplitude < 0.2 * options.radius;
  return {
    trapMinimumExists: trapDepth != null && trapDepth > 0,
    trapMinimum: {
      rho: cleanNumber(globalMinimum.rho),
      z: cleanNumber(globalMinimum.z),
      uEff: cleanNumber(globalMinimum.uEff),
      quiverAmplitude: minimumRow.quiverAmplitude,
    },
    interiorLocalMinimaCount: minima.length,
    escapeLevel: cleanNumber(escapeLevel),
    trapDepth: cleanNumber(trapDepth),
    quiverValidityAtMinimum: quiverValid,
    firstBlocker:
      trapDepth != null && trapDepth > 0
        ? quiverValid
          ? null
          : "quiver_amplitude_exceeds_time_averaging_validity_scale_at_minimum"
        : "escape_level_does_not_exceed_minimum_on_sampled_domain",
  };
}

// Accessory mutual repulsion at the C3-compatible candidate placements,
// compared against the epsilon_- trap depth. Instantaneous like-polarity
// repulsion between static accessory sites (no delay complication between
// static sites), same softening convention.
function compareAgainstAccessoryRepulsion(trapMinus, period, context) {
  const { options } = context;
  const rows = [];
  const trapUsable =
    trapMinus.trapMinimumExists === true && trapMinus.quiverValidityAtMinimum === true;
  const zStar = trapUsable ? trapMinus.trapMinimum.z : null;
  const e1 = [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0];
  const e2 = [
    N_HAT[1] * e1[2] - N_HAT[2] * e1[1],
    N_HAT[2] * e1[0] - N_HAT[0] * e1[2],
    N_HAT[0] * e1[1] - N_HAT[1] * e1[0],
  ];
  for (const spacing of options.candidateSpacings) {
    for (const placementClass of ["on_axis_stack_of_six", "staggered_120_degree_rings_of_three"]) {
      if (!trapUsable) {
        rows.push({
          placementClass,
          spacing,
          supported: false,
          firstBlocker: trapMinus.firstBlocker ?? "no_usable_trap_minimum",
        });
        continue;
      }
      const sites = [];
      if (placementClass === "on_axis_stack_of_six") {
        for (let index = 0; index < 6; index += 1) {
          const z = zStar + (index - 2.5) * spacing;
          sites.push({ rho: 0, z, position: axisPoint(0, z, e1) });
        }
      } else {
        const ringRadius = spacing / Math.sqrt(3); // intra-ring chord equals spacing
        for (let index = 0; index < 3; index += 1) {
          const phase = (2 * Math.PI * index) / 3;
          sites.push(ringSite(ringRadius, zStar - spacing / 2, phase, e1, e2));
          sites.push(ringSite(ringRadius, zStar + spacing / 2, phase + Math.PI / 3, e1, e2));
        }
      }
      const perChargeRepulsion = [];
      for (let i = 0; i < sites.length; i += 1) {
        let repulsion = 0;
        for (let j = 0; j < sites.length; j += 1) {
          if (i === j) {
            continue;
          }
          const dx = sites[i].position[0] - sites[j].position[0];
          const dy = sites[i].position[1] - sites[j].position[1];
          const dz = sites[i].position[2] - sites[j].position[2];
          const distance = Math.hypot(dx, dy, dz);
          repulsion += options.coupling / Math.sqrt(distance * distance + options.softening * options.softening);
        }
        perChargeRepulsion.push(repulsion);
      }
      const perChargeRepulsionMax = Math.max(...perChargeRepulsion);
      // Time-averaged rows are azimuth-independent on the rotating channel,
      // so each site is evaluated at its meridian coordinates (rho, z).
      const siteRows = sites.map((site) => evaluateProbePoint(site.rho, site.z, period, context));
      const allSitesInsideBasin = siteRows.every((row) => row.uEffEpsilonMinus <= trapMinus.escapeLevel);
      const supported =
        allSitesInsideBasin && trapMinus.trapDepth != null && trapMinus.trapDepth >= perChargeRepulsionMax;
      rows.push({
        placementClass,
        spacing,
        perChargeRepulsionMax: cleanNumber(perChargeRepulsionMax),
        trapDepth: trapMinus.trapDepth,
        allSitesInsideBasin,
        supported,
        firstBlocker: supported
          ? null
          : allSitesInsideBasin
            ? "trap_depth_below_per_charge_accessory_mutual_repulsion"
            : "candidate_sites_outside_sampled_trap_basin",
      });
    }
  }
  return {
    comparisonStatement:
      "supported requires an interior trap minimum with quiver validity, all six accessory sites inside the sampled basin, and trap depth at or above the maximum per-charge accessory mutual repulsion",
    rows,
    supportedAtSomeCandidateSpacing: rows.some((row) => row.supported),
  };
}

function axisPoint(rho, z, e1) {
  return [
    rho * e1[0] + z * N_HAT[0],
    rho * e1[1] + z * N_HAT[1],
    rho * e1[2] + z * N_HAT[2],
  ];
}

function ringSite(ringRadius, z, phase, e1, e2) {
  const position = [0, 1, 2].map(
    (axis) =>
      ringRadius * (Math.cos(phase) * e1[axis] + Math.sin(phase) * e2[axis]) + z * N_HAT[axis]
  );
  return { rho: ringRadius, z, position };
}

function firstPresent(entries) {
  for (const [condition, value] of entries) {
    if (condition) {
      return value;
    }
  }
  return null;
}

function signPreservingMax(value, floor) {
  if (value >= 0) {
    return Math.max(value, floor);
  }
  return Math.min(value, -floor);
}

function cleanNumber(value) {
  return Number.isFinite(value) ? Number(value.toPrecision(15)) : value;
}

function numberList(raw, label) {
  const values = raw
    .split(",")
    .map((piece) => piece.trim())
    .filter((piece) => piece.length > 0)
    .map((piece) => Number(piece));
  if (values.length === 0 || values.some((value) => !Number.isFinite(value) || value <= 0)) {
    throw new TypeError(`--${label} requires a comma-separated list of positive finite numbers`);
  }
  return values;
}

function positiveFiniteNumber(raw, label) {
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) {
    throw new TypeError(`--${label} requires a positive finite number`);
  }
  return value;
}

function positiveInteger(raw, label) {
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 3) {
    throw new TypeError(`--${label} requires an integer >= 3`);
  }
  return value;
}

function requireNext(rawArgs, index, arg) {
  const value = rawArgs[index + 1];
  if (value == null || value.startsWith("--")) {
    throw new TypeError(`${arg} requires a value`);
  }
  return value;
}

function printUsage(exitCode) {
  console.log(`Usage: node scripts/braid-ideal/interior-axial-potential-gradient-diagnostic.mjs [options]

Priority-only test-charge diagnostic on the axis-neutral rotating channel:
superposed delayed potential-gradient axial profile, off-axis oscillatory
amplitude, ponderomotive effective potential, trap depth versus accessory
mutual repulsion, and the delayed polarity-sorting check. Fail-closed;
no retained-branch, accepted-evidence, or weak-channel claim.

Options:
  --field-speed <cf>              field speed (default 1)
  --radius <R>                    channel radius (default 1)
  --coupling <kappa>              kernel coupling (default 1)
  --softening <eps>               kernel softening (default 0.05)
  --jacobian-floor <floor>        sign-preserving source-normal floor (default 0.05)
  --surface-speed-fractions <l>   comma list of site-speed fractions in (0,1) (default 0.3,0.6,0.9)
  --time-samples <n>              samples per rotation period (default 60)
  --axial-samples <n>             axial profile samples (default 81)
  --axial-extent <z>              axial profile half-extent (default 2)
  --grid-rho-samples <n>          meridian grid rho samples (default 21)
  --grid-rho-max <rho>            meridian grid rho extent (default 1.3)
  --grid-z-samples <n>            meridian grid z samples (default 41)
  --grid-z-extent <z>             meridian grid z half-extent (default 1.6)
  --candidate-spacings <l>        comma list of accessory spacings (default 0.1,...,0.8)
  --out <path>                    optional output JSON path
  --pretty                        pretty-print output
`);
  process.exit(exitCode);
}
