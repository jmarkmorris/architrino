import assert from "node:assert/strict";

import {
  partnerRoots as circularBinaryPartnerRoots,
  selfRoots as circularBinarySelfRoots,
} from "../../scripts/equation-mapping/analyze-circular-self-hit-binary.mjs";

export const ORTHOGONAL_PLANE_WEAVE_SCHEMA =
  "braid-program/orthogonal-plane-a1.2-a2-compatible-weave-balance.v1";

export const DEFAULT_ORTHOGONAL_PLANE_WEAVE_OPTIONS = Object.freeze({
  fieldSpeed: 1,
  coupling: 1,
  polarityMagnitude: 1,
  radius: 1,
  rootTolerance: 2e-12,
  rootFloor: 2e-9,
  rootTransversalityFloor: 2e-7,
  maximumSubdivisionDepth: 34,
  initialCrossPairPartitions: 64,
});

const TAU = 2 * Math.PI;
const PHASES = Object.freeze([0, TAU / 3, (2 * TAU) / 3]);
const NORMALS = Object.freeze([
  Object.freeze([1, 0, 0]),
  Object.freeze([0, 1, 0]),
  Object.freeze([0, 0, 1]),
]);
const BASE_FRAMES = Object.freeze([
  Object.freeze({ e1: Object.freeze([0, 1, 0]), e2: Object.freeze([0, 0, 1]) }),
  Object.freeze({ e1: Object.freeze([0, 0, 1]), e2: Object.freeze([1, 0, 0]) }),
  Object.freeze({ e1: Object.freeze([1, 0, 0]), e2: Object.freeze([0, 1, 0]) }),
]);

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, factor) {
  return vector.map((value) => value * factor);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function unit(vector) {
  const magnitude = norm(vector);
  assert.ok(magnitude > 0, "cannot normalize a zero vector");
  return scale(vector, 1 / magnitude);
}

function maximumAbsoluteComponent(vector) {
  return Math.max(...vector.map((value) => Math.abs(value)));
}

function rotateTransverseFrame(frame, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return {
    e1: add(scale(frame.e1, cosine), scale(frame.e2, sine)),
    e2: add(scale(frame.e1, -sine), scale(frame.e2, cosine)),
  };
}

export const PHASE_COMPENSATED_FRAMES = Object.freeze(
  BASE_FRAMES.map((frame, index) => {
    const rotated = rotateTransverseFrame(frame, -PHASES[index]);
    return Object.freeze({
      normal: NORMALS[index],
      e1: Object.freeze(rotated.e1),
      e2: Object.freeze(rotated.e2),
    });
  }),
);

export const ORTHOGONAL_PLANE_WEAVE_LABELS = Object.freeze(
  NORMALS.flatMap((_, pairIndex) => [1, -1].map((endpointSign) => Object.freeze({
    id: `a${pairIndex + 1}${endpointSign > 0 ? "+" : "-"}`,
    pairIndex,
    endpointSign,
    polarity: endpointSign,
  }))),
);

export function orthogonalPlaneWeaveState(label, time, beta, radius = 1) {
  assert.ok(Number.isFinite(time));
  assert.ok(Number.isFinite(beta) && beta > 0);
  assert.ok(Number.isFinite(radius) && radius > 0);
  const frame = PHASE_COMPENSATED_FRAMES[label.pairIndex];
  const theta = beta * time + PHASES[label.pairIndex];
  const cosine = Math.cos(theta);
  const sine = Math.sin(theta);
  const endpointSign = label.endpointSign;
  const position = scale(
    add(scale(frame.e1, cosine), scale(frame.e2, sine)),
    endpointSign * radius,
  );
  const velocity = scale(
    add(scale(frame.e1, -sine), scale(frame.e2, cosine)),
    endpointSign * beta,
  );
  const acceleration = scale(position, -(beta * beta) / radius);
  return { position, velocity, acceleration };
}

export function verifyOrthogonalPlaneWeaveGeometry({
  beta,
  sampleCount = 48,
  tolerance = 2e-12,
} = {}) {
  assert.ok(Number.isFinite(beta) && beta > 0);
  assert.ok(Number.isInteger(sampleCount) && sampleCount >= 3);
  const cyclicRotation = ([x, y, z]) => [z, x, y];
  let maximumFrameOrthonormalityResidual = 0;
  let maximumPlaneNormalOrthogonalityResidual = 0;
  let maximumRadiusResidual = 0;
  let maximumAntipodalityResidual = 0;
  let maximumVelocityResidual = 0;
  let maximumAccelerationResidual = 0;
  let maximumCyclicPositionResidual = 0;
  let maximumCyclicVelocityResidual = 0;
  let maximumCyclicAccelerationResidual = 0;
  let minimumDistinctEndpointSeparation = Number.POSITIVE_INFINITY;

  for (let left = 0; left < 3; left += 1) {
    const frame = PHASE_COMPENSATED_FRAMES[left];
    maximumFrameOrthonormalityResidual = Math.max(
      maximumFrameOrthonormalityResidual,
      Math.abs(norm(frame.e1) - 1),
      Math.abs(norm(frame.e2) - 1),
      Math.abs(dot(frame.e1, frame.e2)),
      maximumAbsoluteComponent(subtract(cross(frame.e1, frame.e2), frame.normal)),
    );
    for (let right = left + 1; right < 3; right += 1) {
      maximumPlaneNormalOrthogonalityResidual = Math.max(
        maximumPlaneNormalOrthogonalityResidual,
        Math.abs(dot(PHASE_COMPENSATED_FRAMES[left].normal,
          PHASE_COMPENSATED_FRAMES[right].normal)),
      );
    }
  }

  for (let sample = 0; sample < sampleCount; sample += 1) {
    const time = (TAU * sample) / (sampleCount * beta);
    const states = ORTHOGONAL_PLANE_WEAVE_LABELS.map((label) =>
      orthogonalPlaneWeaveState(label, time, beta));
    for (let pairIndex = 0; pairIndex < 3; pairIndex += 1) {
      const plusIndex = 2 * pairIndex;
      const minusIndex = plusIndex + 1;
      const plus = states[plusIndex];
      const minus = states[minusIndex];
      maximumRadiusResidual = Math.max(
        maximumRadiusResidual,
        Math.abs(norm(plus.position) - 1),
        Math.abs(norm(minus.position) - 1),
      );
      maximumAntipodalityResidual = Math.max(
        maximumAntipodalityResidual,
        maximumAbsoluteComponent(add(plus.position, minus.position)),
      );
      const radial = plus.position;
      const tangent = scale(plus.velocity, 1 / beta);
      maximumVelocityResidual = Math.max(
        maximumVelocityResidual,
        Math.abs(dot(radial, plus.velocity)),
        Math.abs(norm(plus.velocity) - beta),
      );
      maximumAccelerationResidual = Math.max(
        maximumAccelerationResidual,
        maximumAbsoluteComponent(add(plus.acceleration, scale(radial, beta * beta))),
      );
      const nextPairIndex = (pairIndex + 1) % 3;
      const nextPlus = states[2 * nextPairIndex];
      maximumCyclicPositionResidual = Math.max(
        maximumCyclicPositionResidual,
        maximumAbsoluteComponent(subtract(cyclicRotation(plus.position), nextPlus.position)),
      );
      maximumCyclicVelocityResidual = Math.max(
        maximumCyclicVelocityResidual,
        maximumAbsoluteComponent(subtract(cyclicRotation(plus.velocity), nextPlus.velocity)),
      );
      maximumCyclicAccelerationResidual = Math.max(
        maximumCyclicAccelerationResidual,
        maximumAbsoluteComponent(subtract(
          cyclicRotation(plus.acceleration), nextPlus.acceleration)),
      );
      assert.ok(Math.abs(norm(tangent) - 1) <= tolerance);
      assert.ok(Math.abs(dot(radial, tangent)) <= tolerance);
    }
    for (let left = 0; left < states.length; left += 1) {
      for (let right = left + 1; right < states.length; right += 1) {
        minimumDistinctEndpointSeparation = Math.min(
          minimumDistinctEndpointSeparation,
          norm(subtract(states[left].position, states[right].position)),
        );
      }
    }
  }

  const residuals = {
    maximumFrameOrthonormalityResidual,
    maximumPlaneNormalOrthogonalityResidual,
    maximumRadiusResidual,
    maximumAntipodalityResidual,
    maximumVelocityResidual,
    maximumAccelerationResidual,
    maximumCyclicPositionResidual,
    maximumCyclicVelocityResidual,
    maximumCyclicAccelerationResidual,
  };
  return {
    phases: [...PHASES],
    frames: PHASE_COMPENSATED_FRAMES,
    polarityRule: "polarity equals endpoint sign; cyclic rotation preserves polarity",
    circulationRule: "beta>0 with cross(e1,e2)=plane normal for every binary",
    residuals,
    minimumDistinctEndpointSeparation,
    analyticalSameTimeCrossBinaryDotRange: [-0.5, 0.5],
    analyticalMinimumDistinctEndpointSeparation: 1,
    analyticalCollisionFreeIdentity:
      "for every cross-binary endpoint pair, distance^2=2 plus or minus sin(2*beta*T), so distance>=1; antipodal partners have distance=2",
    passed: Object.values(residuals).every((value) => value <= tolerance) &&
      minimumDistinctEndpointSeparation > tolerance,
  };
}

function squaredCausalState(receiver, transmitter, receptionTime, delay, beta) {
  const receiverState = orthogonalPlaneWeaveState(receiver, receptionTime, beta);
  const transmitterState = orthogonalPlaneWeaveState(
    transmitter,
    receptionTime - delay,
    beta,
  );
  const separation = subtract(receiverState.position, transmitterState.position);
  const distanceSquared = dot(separation, separation);
  const squaredResidual = distanceSquared - delay * delay;
  const derivative = 2 * dot(separation, transmitterState.velocity) - 2 * delay;
  return {
    receiverState,
    transmitterState,
    separation,
    distanceSquared,
    squaredResidual,
    derivative,
  };
}

function bisectSquaredRoot({
  receiver,
  transmitter,
  receptionTime,
  beta,
  left,
  right,
  tolerance,
}) {
  let leftValue = squaredCausalState(
    receiver, transmitter, receptionTime, left, beta).squaredResidual;
  let rightValue = squaredCausalState(
    receiver, transmitter, receptionTime, right, beta).squaredResidual;
  assert.ok(leftValue === 0 || rightValue === 0 || Math.sign(leftValue) !== Math.sign(rightValue));
  for (let iteration = 0; iteration < 180; iteration += 1) {
    const middle = (left + right) / 2;
    const middleValue = squaredCausalState(
      receiver, transmitter, receptionTime, middle, beta).squaredResidual;
    if (Math.abs(middleValue) <= tolerance * tolerance ||
        right - left <= tolerance * Math.max(1, Math.abs(middle))) {
      return { delay: middle, iterations: iteration + 1, finalBracket: [left, right] };
    }
    if (Math.sign(middleValue) === Math.sign(leftValue)) {
      left = middle;
      leftValue = middleValue;
    } else {
      right = middle;
      rightValue = middleValue;
    }
  }
  throw new Error(`cross-pair bisection failed on [${left},${right}]`);
}

function mergeCertifiedRootFreeIntervals(intervals, tolerance) {
  const sorted = [...intervals].sort((left, right) => left.left - right.left);
  const merged = [];
  for (const interval of sorted) {
    const previous = merged[merged.length - 1];
    if (previous && Math.abs(previous.right - interval.left) <= tolerance) {
      previous.right = Math.max(previous.right, interval.right);
      if (!previous.certificates.includes(interval.certificate)) {
        previous.certificates.push(interval.certificate);
      }
    } else {
      merged.push({
        left: interval.left,
        right: interval.right,
        certificates: [interval.certificate],
      });
    }
  }
  return merged;
}

function enumerateCrossPairRoots({
  receiver,
  transmitter,
  receptionTime,
  beta,
  options,
}) {
  const secondDerivativeBound = 6 * beta * beta + 2;
  const roots = [];
  const certifiedRootFreeIntervals = [];
  const unresolvedIntervals = [];
  const width = 2 / options.initialCrossPairPartitions;
  const stack = Array.from({ length: options.initialCrossPairPartitions }, (_, index) => ({
    left: index * width,
    right: (index + 1) * width,
    depth: 0,
  })).reverse();

  while (stack.length > 0) {
    const interval = stack.pop();
    const { left, right, depth } = interval;
    const middle = (left + right) / 2;
    const halfWidth = (right - left) / 2;
    const leftValue = squaredCausalState(
      receiver, transmitter, receptionTime, left, beta).squaredResidual;
    const rightValue = squaredCausalState(
      receiver, transmitter, receptionTime, right, beta).squaredResidual;
    const middleState = squaredCausalState(
      receiver, transmitter, receptionTime, middle, beta);
    const valueRadius = Math.abs(middleState.derivative) * halfWidth +
      0.5 * secondDerivativeBound * halfWidth * halfWidth;
    const valueRange = [
      middleState.squaredResidual - valueRadius,
      middleState.squaredResidual + valueRadius,
    ];
    if (valueRange[0] > 0 || valueRange[1] < 0) {
      certifiedRootFreeIntervals.push({ left, right, certificate: "taylor-value-exclusion" });
      continue;
    }
    const derivativeRange = [
      middleState.derivative - secondDerivativeBound * halfWidth,
      middleState.derivative + secondDerivativeBound * halfWidth,
    ];
    const monotonic = derivativeRange[0] > 0 || derivativeRange[1] < 0;
    const signChange = leftValue === 0 || rightValue === 0 ||
      Math.sign(leftValue) !== Math.sign(rightValue);
    if (monotonic && signChange) {
      roots.push({
        ...bisectSquaredRoot({
          receiver,
          transmitter,
          receptionTime,
          beta,
          left,
          right,
          tolerance: options.rootTolerance,
        }),
        isolationInterval: [left, right],
        certificate: {
          kind: "monotonic-squared-residual-bracket.v1",
          derivativeRange,
          secondDerivativeBound,
        },
      });
      continue;
    }
    if (monotonic && !signChange) {
      certifiedRootFreeIntervals.push({ left, right, certificate: "monotonic-endpoint-sign" });
      continue;
    }
    if (depth >= options.maximumSubdivisionDepth) {
      unresolvedIntervals.push({ left, right, valueRange, derivativeRange, reason: "depth-limit" });
      continue;
    }
    stack.push(
      { left: middle, right, depth: depth + 1 },
      { left, right: middle, depth: depth + 1 },
    );
  }

  roots.sort((left, right) => left.delay - right.delay);
  const uniqueRoots = roots.filter((root, index) =>
    index === 0 || Math.abs(root.delay - roots[index - 1].delay) >
      8 * options.rootTolerance);
  return {
    roots: uniqueRoots,
    certifiedRootFreeIntervals: mergeCertifiedRootFreeIntervals(
      certifiedRootFreeIntervals,
      8 * options.rootTolerance,
    ),
    unresolvedIntervals,
    complete: unresolvedIntervals.length === 0,
    secondDerivativeBound,
  };
}

function analyticCircularRoots(receiver, transmitter, beta, options) {
  const sameEndpoint = receiver.id === transmitter.id;
  const roots = sameEndpoint
    ? (beta > 1 ? circularBinarySelfRoots(beta) : [])
    : circularBinaryPartnerRoots(beta);
  const delays = roots.map((root) => (2 * root) / beta)
    .filter((delay) => delay >= options.rootFloor && delay <= 2 + options.rootTolerance)
    .sort((left, right) => left - right);
  const boundaries = [0, ...delays, 2];
  return {
    roots: delays.map((delay) => ({
      delay,
      iterations: null,
      finalBracket: null,
      isolationInterval: null,
      certificate: {
        kind: sameEndpoint
          ? "canonical-circular-self-half-lobe-enumeration.v1"
          : "canonical-circular-partner-half-lobe-enumeration.v1",
        source: "scripts/equation-mapping/analyze-circular-self-hit-binary.mjs",
      },
    })),
    certifiedRootFreeIntervals: boundaries.slice(0, -1).map((left, index) => ({
      left,
      right: boundaries[index + 1],
      certificates: ["analytic-circular-half-lobe-partition"],
    })),
    unresolvedIntervals: [],
    complete: true,
  };
}

function evaluateRoot({
  receiver,
  transmitter,
  receptionTime,
  beta,
  isolated,
  ordinal,
  options,
}) {
  const delay = isolated.delay;
  const state = squaredCausalState(receiver, transmitter, receptionTime, delay, beta);
  const distance = Math.sqrt(state.distanceSquared);
  const direction = unit(state.separation);
  const transmitterProjection = dot(state.transmitterState.velocity, direction);
  const receiverProjection = dot(state.receiverState.velocity, direction);
  const dt = options.fieldSpeed - transmitterProjection;
  const dr = options.fieldSpeed - receiverProjection;
  const accelerationWeight = options.fieldSpeed / Math.abs(dt);
  const polaritySign = receiver.polarity * transmitter.polarity;
  const magnitude = options.coupling * polaritySign *
    options.polarityMagnitude * options.polarityMagnitude *
    accelerationWeight / (distance * distance);
  const accelerationContribution = scale(direction, magnitude);
  return {
    rootId: `${receiver.id}<-${transmitter.id}:root:${ordinal}`,
    identity: {
      receiverId: receiver.id,
      transmitterId: transmitter.id,
      rootOrdinal: ordinal,
      sameTransmitter: receiver.id === transmitter.id,
    },
    multiplicity: 1,
    emissionTime: receptionTime - delay,
    receptionTime,
    delay,
    separation: state.separation,
    distance,
    rootResidual: distance - delay,
    squaredRootResidual: state.squaredResidual,
    direction,
    transmitterVelocity: state.transmitterState.velocity,
    receiverVelocity: state.receiverState.velocity,
    transmitterSideFactorDt: dt,
    receiverSideFactorDr: dr,
    rootPlaybackDerivative: dr / dt,
    accelerationWeight,
    jacobianFloor: Math.abs(dt),
    regular: Math.abs(dt) >= options.rootTransversalityFloor,
    polaritySign,
    accelerationContribution,
    isolation: isolated.certificate,
    finalBracket: isolated.finalBracket,
    rootIterations: isolated.iterations,
  };
}

export function evaluateOrthogonalPlaneWeavePhase({
  beta,
  phase,
  options: rawOptions = {},
} = {}) {
  const options = { ...DEFAULT_ORTHOGONAL_PLANE_WEAVE_OPTIONS, ...rawOptions };
  assert.equal(options.fieldSpeed, 1, "new numerical work requires c_f=1");
  assert.ok(Number.isFinite(beta) && beta > 0);
  assert.ok(Number.isFinite(phase));
  const receptionTime = phase / beta;
  const receivers = [];
  let rootComplete = true;
  let regular = true;
  let maximumRootResidual = 0;
  let maximumSquaredRootResidual = 0;
  let minimumJacobianFloor = Number.POSITIVE_INFINITY;

  for (const receiver of ORTHOGONAL_PLANE_WEAVE_LABELS) {
    const receiverState = orthogonalPlaneWeaveState(receiver, receptionTime, beta);
    const radial = unit(receiverState.position);
    const tangent = unit(receiverState.velocity);
    const planeNormal = unit(cross(radial, tangent));
    const roots = [];
    const directedPairs = [];
    for (const transmitter of ORTHOGONAL_PLANE_WEAVE_LABELS) {
      const sameBinary = receiver.pairIndex === transmitter.pairIndex;
      const enumeration = sameBinary
        ? analyticCircularRoots(receiver, transmitter, beta, options)
        : enumerateCrossPairRoots({
          receiver,
          transmitter,
          receptionTime,
          beta,
          options,
        });
      rootComplete &&= enumeration.complete;
      const pairRoots = enumeration.roots.map((isolated, ordinal) =>
        evaluateRoot({
          receiver,
          transmitter,
          receptionTime,
          beta,
          isolated,
          ordinal,
          options,
        }));
      pairRoots.forEach((root) => {
        maximumRootResidual = Math.max(maximumRootResidual, Math.abs(root.rootResidual));
        maximumSquaredRootResidual = Math.max(
          maximumSquaredRootResidual, Math.abs(root.squaredRootResidual));
        minimumJacobianFloor = Math.min(minimumJacobianFloor, root.jacobianFloor);
        regular &&= root.regular;
      });
      roots.push(...pairRoots);
      directedPairs.push({
        pairId: `${receiver.id}<-${transmitter.id}`,
        receiverId: receiver.id,
        transmitterId: transmitter.id,
        sameTransmitter: receiver.id === transmitter.id,
        sameBinary,
        coincidentSelfRootExcluded: receiver.id === transmitter.id,
        rootCount: pairRoots.length,
        roots: pairRoots,
        inactiveRootGaps: enumeration.certifiedRootFreeIntervals,
        unresolvedIntervals: enumeration.unresolvedIntervals,
        complete: enumeration.complete,
      });
    }
    const masterAcceleration = roots.reduce(
      (sum, root) => add(sum, root.accelerationContribution), [0, 0, 0]);
    const projections = {
      radial: dot(masterAcceleration, radial),
      tangent: dot(masterAcceleration, tangent),
      planeNormal: dot(masterAcceleration, planeNormal),
    };
    receivers.push({
      receiverId: receiver.id,
      pairIndex: receiver.pairIndex,
      endpointSign: receiver.endpointSign,
      polarity: receiver.polarity,
      position: receiverState.position,
      velocity: receiverState.velocity,
      prescribedAcceleration: receiverState.acceleration,
      basis: { radial, tangent, planeNormal },
      directedPairs,
      rootCount: roots.length,
      masterAcceleration,
      masterAccelerationProjections: projections,
      compatibleRadiusFromRadial: projections.radial < 0
        ? -projections.radial / (beta * beta)
        : null,
    });
  }

  return {
    beta,
    phase,
    receptionTime,
    rootComplete,
    regular,
    maximumRootResidual,
    maximumSquaredRootResidual,
    minimumJacobianFloor,
    receivers,
  };
}

function summarizePhaseEvaluations(beta, phaseEvaluations) {
  const rows = phaseEvaluations.flatMap((phase) => phase.receivers.map((receiver) => ({
    phase: phase.phase,
    receiverId: receiver.receiverId,
    radial: receiver.masterAccelerationProjections.radial,
    tangent: receiver.masterAccelerationProjections.tangent,
    planeNormal: receiver.masterAccelerationProjections.planeNormal,
    compatibleRadiusFromRadial: receiver.compatibleRadiusFromRadial,
  })));
  const inwardRows = rows.filter((row) => row.radial < 0);
  const meanRadial = rows.reduce((sum, row) => sum + row.radial, 0) / rows.length;
  const bestCompatibleRadius = Math.max(0, -meanRadial / (beta * beta));
  const residualRows = rows.map((row) => {
    const radial = row.radial + beta * beta * bestCompatibleRadius;
    const fullVector = Math.hypot(radial, row.tangent, row.planeNormal);
    return { ...row, balanceResidual: { radial, tangent: row.tangent,
      planeNormal: row.planeNormal, fullVector } };
  });
  const compatibleRadii = inwardRows.map((row) => row.compatibleRadiusFromRadial);
  return {
    beta,
    phaseSampleCount: phaseEvaluations.length,
    rootComplete: phaseEvaluations.every((phase) => phase.rootComplete),
    regular: phaseEvaluations.every((phase) => phase.regular),
    maximumRootResidual: Math.max(...phaseEvaluations.map((phase) => phase.maximumRootResidual)),
    maximumSquaredRootResidual: Math.max(
      ...phaseEvaluations.map((phase) => phase.maximumSquaredRootResidual)),
    minimumJacobianFloor: Math.min(...phaseEvaluations.map((phase) => phase.minimumJacobianFloor)),
    maximumAbsoluteTangent: Math.max(...rows.map((row) => Math.abs(row.tangent))),
    maximumAbsolutePlaneNormal: Math.max(...rows.map((row) => Math.abs(row.planeNormal))),
    minimumAbsoluteTransverseVector: Math.min(
      ...rows.map((row) => Math.hypot(row.tangent, row.planeNormal))),
    maximumAbsoluteTransverseVector: Math.max(
      ...rows.map((row) => Math.hypot(row.tangent, row.planeNormal))),
    radialRange: [
      Math.min(...rows.map((row) => row.radial)),
      Math.max(...rows.map((row) => row.radial)),
    ],
    compatibleRadiusRange: compatibleRadii.length === rows.length
      ? [Math.min(...compatibleRadii), Math.max(...compatibleRadii)]
      : null,
    radialSignFailure: inwardRows.length !== rows.length,
    bestCompatibleRadius,
    maximumFullVectorResidual: Math.max(
      ...residualRows.map((row) => row.balanceResidual.fullVector)),
    residualRows,
  };
}

export function evaluateOrthogonalPlaneWeaveCycle({
  beta,
  phaseSampleCount = 48,
  options = {},
  includeFullLedgers = true,
} = {}) {
  assert.ok(Number.isInteger(phaseSampleCount) && phaseSampleCount >= 3);
  const geometry = verifyOrthogonalPlaneWeaveGeometry({ beta, sampleCount: phaseSampleCount });
  const phaseEvaluations = Array.from({ length: phaseSampleCount }, (_, index) =>
    evaluateOrthogonalPlaneWeavePhase({
      beta,
      phase: (TAU * index) / phaseSampleCount,
      options,
    }));
  const summary = summarizePhaseEvaluations(beta, phaseEvaluations);
  return {
    schema: ORTHOGONAL_PLANE_WEAVE_SCHEMA,
    authority: "bounded prescribed-history diagnostic",
    modelScope: {
      law: "default uncapped canonical Master Equation",
      lineOfAction: "emission site to reception site",
      fieldSpeedCeilingApplied: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      historyBoundary:
        "the exact prescribed circular worldlines are extended periodically to the complete causal delay interval; no finite retained-history boundary is used",
    },
    normalization: {
      fieldSpeed: 1,
      radiusUsedForRootGeometry: 1,
      coupling: 1,
      polarityMagnitude: 1,
      betaDefinition: "beta_f=Omega*R/c_f",
      accelerationUnit: "kappa*abs(q)^2/R^2",
    },
    geometry,
    scan: {
      beta,
      fullPeriodInReceptionTime: TAU / beta,
      phaseDomain: [0, TAU],
      phaseSampleCount,
      phaseGridRule: "uniform half-open grid including phase 0",
    },
    rootPolicy: {
      sameBinary: "independently existing canonical circular half-lobe enumerator",
      crossBinary: "adaptive Taylor value exclusion plus monotonic squared-residual isolation",
      delayDomain: [0, 2],
      coincidentSelfRoot: "excluded",
      nontrivialSameTransmitterRoots: "included",
      options: { ...DEFAULT_ORTHOGONAL_PLANE_WEAVE_OPTIONS, ...options },
    },
    summary,
    ...(includeFullLedgers ? { phaseEvaluations } : {}),
    claimBoundary: {
      establishes: [
        "exact prescribed geometry identities up to stated floating-point residuals",
        "complete simple-root enumeration at every reported sampled reception phase when rootComplete=true",
        "canonical emission-site acceleration sums and three-component residuals at reported samples",
      ],
      doesNotEstablish: [
        "an interval enclosure of the complete phase continuum",
        "finite fold or caustic continuation",
        "EOM-solver evolution",
        "retention",
        "stability",
        "binding",
        "physical realization",
        "failure of other three-dimensional 3:3 histories",
        "any N>3 braid family",
      ],
      missingIndependentCheck:
        "No independently authored full six-worldline Master Equation acceleration oracle is available; geometry and root residual identities have independent analytical controls, but the six-body acceleration sum remains diagnostic.",
    },
    falsifiers: [
      "A direct-coordinate or independently authored root oracle finds an omitted causal root or rejects a reported root.",
      "A canonical per-hit acceleration implementation disagrees with a reported contribution under the same root ledger and normalization.",
      "Phase refinement drives every transverse component and the common-radius radial spread to zero on one regular beta branch.",
    ],
  };
}

export function scanOrthogonalPlaneWeaveBetas({
  betas,
  phaseSampleCount = 24,
  options = {},
} = {}) {
  assert.ok(Array.isArray(betas) && betas.length > 0);
  return betas.map((beta) => evaluateOrthogonalPlaneWeaveCycle({
    beta,
    phaseSampleCount,
    options,
    includeFullLedgers: false,
  }).summary);
}
