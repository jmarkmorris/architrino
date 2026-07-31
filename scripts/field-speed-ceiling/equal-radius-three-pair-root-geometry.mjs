#!/usr/bin/env node

import assert from "node:assert/strict";

// This instrument numerically reproduces the analytic root-count theorem in
// the owning Field-Speed Ceiling mathematics packet. Its time scan is a
// geometry diagnostic, not the proof of root completeness.

const TAU = 2 * Math.PI;
const PHASES = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
const ROOT_TOLERANCE = 2e-13;
const MAX_BISECTION_STEPS = 100;

const sampleCountArgument = process.argv.find((argument) =>
  argument.startsWith("--samples="),
);
const sampleCount = sampleCountArgument
  ? Number.parseInt(sampleCountArgument.split("=")[1], 10)
  : 721;
const includeRecords = process.argv.includes("--records");

if (!Number.isInteger(sampleCount) || sampleCount < 3) {
  throw new Error("--samples must be an integer greater than or equal to 3");
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, factor) {
  return vector.map((value) => factor * value);
}

function dot(left, right) {
  return left.reduce(
    (sum, value, index) => sum + value * right[index],
    0,
  );
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
  assert(magnitude > 0, "cannot normalize the zero vector");
  return scale(vector, 1 / magnitude);
}

function position(label, time) {
  const theta = time + PHASES[label.pair];
  const cosine = Math.cos(theta);
  const sine = Math.sin(theta);
  const member = label.member;

  if (label.pair === 0) {
    return [0, member * cosine, member * sine];
  }
  if (label.pair === 1) {
    return [member * sine, 0, member * cosine];
  }
  return [member * cosine, member * sine, 0];
}

function velocity(label, time) {
  const theta = time + PHASES[label.pair];
  const cosine = Math.cos(theta);
  const sine = Math.sin(theta);
  const member = label.member;

  if (label.pair === 0) {
    return [0, -member * sine, member * cosine];
  }
  if (label.pair === 1) {
    return [member * cosine, 0, -member * sine];
  }
  return [-member * sine, member * cosine, 0];
}

function causalResidual(receiver, transmitter, receptionTime, delay) {
  const separation = subtract(
    position(receiver, receptionTime),
    position(transmitter, receptionTime - delay),
  );
  return norm(separation) - delay;
}

function sameLabel(receiver, transmitter) {
  return (
    receiver.pair === transmitter.pair &&
    receiver.member === transmitter.member
  );
}

function solveDistinctLabelRoot(receiver, transmitter, receptionTime) {
  assert(
    !sameLabel(receiver, transmitter),
    "distinct-label root solver received a self label",
  );

  let lower = 0;
  let upper = 2;
  let lowerResidual = causalResidual(
    receiver,
    transmitter,
    receptionTime,
    lower,
  );
  let upperResidual = causalResidual(
    receiver,
    transmitter,
    receptionTime,
    upper,
  );

  assert(
    lowerResidual > 0,
    "reference geometry must have positive same-time distinct-label separation",
  );
  assert(
    upperResidual <= ROOT_TOLERANCE,
    "the root must occur no later than delay 2",
  );

  if (Math.abs(upperResidual) <= ROOT_TOLERANCE) {
    return upper;
  }

  for (let step = 0; step < MAX_BISECTION_STEPS; step += 1) {
    const midpoint = (lower + upper) / 2;
    const midpointResidual = causalResidual(
      receiver,
      transmitter,
      receptionTime,
      midpoint,
    );

    if (Math.abs(midpointResidual) <= ROOT_TOLERANCE) {
      return midpoint;
    }

    if (midpointResidual > 0) {
      lower = midpoint;
      lowerResidual = midpointResidual;
    } else {
      upper = midpoint;
      upperResidual = midpointResidual;
    }
  }

  assert(lowerResidual > 0 && upperResidual < 0);
  return (lower + upper) / 2;
}

function rootRecord(receiver, transmitter, receptionTime) {
  const delay = solveDistinctLabelRoot(
    receiver,
    transmitter,
    receptionTime,
  );
  const transmitterTime = receptionTime - delay;
  const residual = causalResidual(
    receiver,
    transmitter,
    receptionTime,
    delay,
  );
  const separation = subtract(
    position(receiver, receptionTime),
    position(transmitter, transmitterTime),
  );
  const direction = unit(separation);
  const transmitterJacobian =
    1 - dot(direction, velocity(transmitter, transmitterTime));
  const receiverJacobian =
    1 - dot(direction, velocity(receiver, receptionTime));

  assert(
    Math.abs(residual) <= 4 * ROOT_TOLERANCE,
    "bisection root residual exceeds the declared tolerance",
  );
  assert(
    transmitterJacobian > 0,
    "the common-radius positive-delay root must be transmitter-regular",
  );
  assert(
    receiverJacobian > 0,
    "the common-radius positive-delay root must have forward playback",
  );

  return {
    delay,
    direction,
    receiverJacobian,
    transmitterJacobian,
  };
}

function ordinaryContribution(
  receiver,
  transmitter,
  root,
  polarityOrientation,
) {
  const receiverPolarity =
    polarityOrientation[receiver.pair] * receiver.member;
  const transmitterPolarity =
    polarityOrientation[transmitter.pair] * transmitter.member;
  const polaritySign = receiverPolarity * transmitterPolarity;
  const magnitude =
    polaritySign /
    (root.delay * root.delay * root.transmitterJacobian);

  return scale(root.direction, magnitude);
}

function projectedAcceleration(rawAcceleration, receiverVelocity) {
  const speedChanging = dot(receiverVelocity, rawAcceleration);
  if (speedChanging <= 0) {
    return rawAcceleration;
  }
  return subtract(
    rawAcceleration,
    scale(receiverVelocity, speedChanging),
  );
}

function labelName(label) {
  return `${label.pair + 1}${label.member > 0 ? "+" : "-"}`;
}

const labels = [];
for (let pair = 0; pair < 3; pair += 1) {
  for (const member of [1, -1]) {
    labels.push({ pair, member });
  }
}

const polarityOrientations = [
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1],
];

let minimumSameTimeSeparation = Number.POSITIVE_INFINITY;
let minimumTransmitterJacobian = Number.POSITIVE_INFINITY;
let minimumReceiverJacobian = Number.POSITIVE_INFINITY;
let minimumDelay = Number.POSITIVE_INFINITY;
let maximumDelay = 0;
let maximumSelfResidual = Number.NEGATIVE_INFINITY;
let maximumMirrorDelayDifference = 0;
let ordinaryRootCount = 0;

const responseDiagnostics = polarityOrientations.map(
  (polarityOrientation) => ({
    polarityOrientation,
    minimumRawSpeedChanging: Number.POSITIVE_INFINITY,
    maximumRawSpeedChanging: Number.NEGATIVE_INFINITY,
    minimumTurningCoefficient: Number.POSITIVE_INFINITY,
    maximumTurningCoefficient: Number.NEGATIVE_INFINITY,
    maximumAbsoluteBinormal: 0,
    maximumUnitCouplingClosureResidual: 0,
  }),
);

const sampleRecords = [];

for (let sample = 0; sample < sampleCount; sample += 1) {
  const receptionTime = (TAU * sample) / sampleCount;
  const perLabel = [];

  for (const receiver of labels) {
    const receiverPosition = position(receiver, receptionTime);
    const receiverVelocity = velocity(receiver, receptionTime);
    const targetTurning = scale(receiverPosition, -1);
    const binormal = unit(cross(receiverPosition, receiverVelocity));
    const rawAccelerations = polarityOrientations.map(() => [0, 0, 0]);
    const roots = [];

    for (const transmitter of labels) {
      if (sameLabel(receiver, transmitter)) {
        for (let selfSample = 1; selfSample <= 32; selfSample += 1) {
          const delay = (2 * selfSample) / 32;
          maximumSelfResidual = Math.max(
            maximumSelfResidual,
            causalResidual(receiver, transmitter, receptionTime, delay),
          );
        }
        continue;
      }

      minimumSameTimeSeparation = Math.min(
        minimumSameTimeSeparation,
        norm(
          subtract(
            receiverPosition,
            position(transmitter, receptionTime),
          ),
        ),
      );

      const root = rootRecord(
        receiver,
        transmitter,
        receptionTime,
      );
      roots.push({
        transmitter: labelName(transmitter),
        delay: root.delay,
        receiverJacobian: root.receiverJacobian,
        transmitterJacobian: root.transmitterJacobian,
      });
      for (
        let orientationIndex = 0;
        orientationIndex < polarityOrientations.length;
        orientationIndex += 1
      ) {
        rawAccelerations[orientationIndex] = add(
          rawAccelerations[orientationIndex],
          ordinaryContribution(
            receiver,
            transmitter,
            root,
            polarityOrientations[orientationIndex],
          ),
        );
      }
      ordinaryRootCount += 1;
      minimumTransmitterJacobian = Math.min(
        minimumTransmitterJacobian,
        root.transmitterJacobian,
      );
      minimumReceiverJacobian = Math.min(
        minimumReceiverJacobian,
        root.receiverJacobian,
      );
      minimumDelay = Math.min(minimumDelay, root.delay);
      maximumDelay = Math.max(maximumDelay, root.delay);
    }

    const responses = rawAccelerations.map(
      (rawAcceleration, orientationIndex) => {
        const effectiveAcceleration = projectedAcceleration(
          rawAcceleration,
          receiverVelocity,
        );
        const rawSpeedChanging = dot(receiverVelocity, rawAcceleration);
        const turningCoefficient = dot(
          effectiveAcceleration,
          targetTurning,
        );
        const binormalComponent = dot(effectiveAcceleration, binormal);
        const closureResidual = norm(
          subtract(effectiveAcceleration, targetTurning),
        );
        const diagnostic = responseDiagnostics[orientationIndex];

        diagnostic.minimumRawSpeedChanging = Math.min(
          diagnostic.minimumRawSpeedChanging,
          rawSpeedChanging,
        );
        diagnostic.maximumRawSpeedChanging = Math.max(
          diagnostic.maximumRawSpeedChanging,
          rawSpeedChanging,
        );
        diagnostic.minimumTurningCoefficient = Math.min(
          diagnostic.minimumTurningCoefficient,
          turningCoefficient,
        );
        diagnostic.maximumTurningCoefficient = Math.max(
          diagnostic.maximumTurningCoefficient,
          turningCoefficient,
        );
        diagnostic.maximumAbsoluteBinormal = Math.max(
          diagnostic.maximumAbsoluteBinormal,
          Math.abs(binormalComponent),
        );
        diagnostic.maximumUnitCouplingClosureResidual = Math.max(
          diagnostic.maximumUnitCouplingClosureResidual,
          closureResidual,
        );

        return {
          polarityOrientation:
            polarityOrientations[orientationIndex].join(","),
          rawSpeedChanging,
          turningCoefficient,
          binormalComponent,
          unitCouplingClosureResidual: closureResidual,
        };
      },
    );

    perLabel.push({
      receiver: labelName(receiver),
      roots,
      responses,
    });
  }

  for (let pair = 0; pair < 3; pair += 1) {
    const plus = perLabel[2 * pair];
    const minus = perLabel[2 * pair + 1];
    for (let rootIndex = 0; rootIndex < plus.roots.length; rootIndex += 1) {
      const plusRoot = plus.roots[rootIndex];
      const expectedMirrorTransmitter = plusRoot.transmitter.endsWith("+")
        ? `${plusRoot.transmitter.slice(0, -1)}-`
        : `${plusRoot.transmitter.slice(0, -1)}+`;
      const minusRoot = minus.roots.find(
        (root) => root.transmitter === expectedMirrorTransmitter,
      );
      assert(minusRoot, "missing sign-reversed mirror root");
      maximumMirrorDelayDifference = Math.max(
        maximumMirrorDelayDifference,
        Math.abs(plusRoot.delay - minusRoot.delay),
      );
    }
  }

  if (
    includeRecords &&
    (sample === 0 ||
      sample === Math.floor(sampleCount / 3) ||
      sample === Math.floor((2 * sampleCount) / 3))
  ) {
    sampleRecords.push({
      receptionTime,
      labels: perLabel,
    });
  }
}

assert(
  ordinaryRootCount === sampleCount * labels.length * (labels.length - 1),
  "each ordered distinct-label channel must have one root per sample",
);
assert(
  maximumSelfResidual < 0,
  "same-label circular paths must have no positive-delay root",
);

const result = {
  schema: "field_speed_ceiling_equal_radius_three_pair_geometry/v1",
  authority: "geometry-only numerical diagnostic",
  normalization: {
    c_f: 1,
    radius: 1,
    omega: 1,
    polarityMagnitude: 1,
    couplingFactor: 1,
  },
  sampling: {
    commonPeriod: TAU,
    receptionTimeSamples: sampleCount,
    delayInterval: [0, 2],
  },
  rootInventory: {
    labels: labels.length,
    sameLabelChannelsPerTime: labels.length,
    ordinaryDistinctLabelChannelsPerTime:
      labels.length * (labels.length - 1),
    ordinaryRootsEvaluated: ordinaryRootCount,
    minimumSameTimeDistinctLabelSeparation: minimumSameTimeSeparation,
    minimumDelay,
    maximumDelay,
    minimumReceiverJacobian,
    minimumTransmitterJacobian,
    maximumSampledSameLabelResidual: maximumSelfResidual,
    maximumSignReversedMirrorDelayDifference: maximumMirrorDelayDifference,
  },
  minimalTotalLedgerResponse: {
    polarityOrientationsChecked: polarityOrientations.length,
    diagnostics: responseDiagnostics.map((diagnostic) => ({
      polarityOrientation: diagnostic.polarityOrientation,
      minimumRawSpeedChanging: diagnostic.minimumRawSpeedChanging,
      maximumRawSpeedChanging: diagnostic.maximumRawSpeedChanging,
      minimumTurningCoefficientAtUnitCoupling:
        diagnostic.minimumTurningCoefficient,
      maximumTurningCoefficientAtUnitCoupling:
        diagnostic.maximumTurningCoefficient,
      maximumAbsoluteBinormalAtUnitCoupling:
        diagnostic.maximumAbsoluteBinormal,
      maximumUnitCouplingClosureResidual:
        diagnostic.maximumUnitCouplingClosureResidual,
      sampledNecessaryConditionsSatisfied:
        diagnostic.minimumRawSpeedChanging >= -1e-10 &&
        diagnostic.maximumAbsoluteBinormal <= 1e-10 &&
        diagnostic.maximumTurningCoefficient -
          diagnostic.minimumTurningCoefficient <=
          1e-10 &&
        diagnostic.minimumTurningCoefficient > 0,
    })),
  },
  claimBoundary: {
    establishes:
      "sampled reproduction of the analytic root inventory and a sampled all-label vector-closure diagnostic",
    doesNotEstablish: [
      "a field-speed ceiling",
      "root-count proof",
      "retained braid",
      "cap-response selection",
      "phase lock",
      "radius selection",
      "stability",
      "physical realization",
    ],
  },
  ...(includeRecords ? { sampleRecords } : {}),
};

console.log(JSON.stringify(result, null, 2));
