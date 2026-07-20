#!/usr/bin/env node

const pitchAmplitude = 0.204;
const bStar = 3.5;

const branches = [
  {
    id: "P1",
    kind: "partner",
    window: [2.55, 2.69],
    absoluteTransmitterFactor: [3.68716858750136, 4.431676467309756],
  },
  {
    id: "P2",
    kind: "partner",
    window: [4.0, 4.34],
    absoluteTransmitterFactor: [1.5675458135817848, 2.3490890666655564],
  },
  {
    id: "P3",
    kind: "partner",
    window: [6.78, 7.12],
    absoluteTransmitterFactor: [1.262499729917764, 2.247802759764517],
  },
  {
    id: "S1",
    kind: "self",
    window: [4.82, 5.02],
    absoluteTransmitterFactor: [4.178866881884487, 4.822357388971106],
  },
];

function evaluate(kind, delta) {
  const rho = Math.exp(pitchAmplitude * (1 - Math.cos(delta)));
  const lambda = Math.sqrt(
    1 + rho * rho + (kind === "partner" ? 2 : -2) * rho * Math.cos(delta),
  );
  const rootResidual = lambda - delta / bStar;
  const transmitterPitch = pitchAmplitude * Math.sin(delta);
  const transmitterFactor =
    kind === "partner"
      ? 1 +
        (bStar * rho) / lambda *
          (Math.sin(delta) -
            transmitterPitch * (Math.cos(delta) + rho))
      : 1 -
        (bStar * rho) / lambda *
          (Math.sin(delta) +
            transmitterPitch * (rho - Math.cos(delta)));
  const receiverFactor =
    kind === "partner"
      ? 1 + (bStar * rho * Math.sin(delta)) / lambda
      : 1 - (bStar * rho * Math.sin(delta)) / lambda;
  const accelerationWeight = 1 / Math.abs(transmitterFactor);
  const radialContribution =
    (kind === "partner" ? -1 : 1) *
    accelerationWeight *
    (1 + (kind === "partner" ? 1 : -1) * rho * Math.cos(delta)) /
    lambda ** 3;
  const tangentialContribution =
    (accelerationWeight * rho * Math.sin(delta)) / lambda ** 3;

  return {
    rho,
    lambda,
    rootResidual,
    transmitterFactor,
    receiverFactor,
    accelerationWeight,
    signedRootPlayback: receiverFactor / transmitterFactor,
    radialContribution,
    tangentialContribution,
  };
}

function solveRoot(kind, lowerInput, upperInput) {
  let lower = lowerInput;
  let upper = upperInput;
  let lowerResidual = evaluate(kind, lower).rootResidual;
  const upperResidual = evaluate(kind, upper).rootResidual;
  if (Math.sign(lowerResidual) === Math.sign(upperResidual)) {
    throw new Error(`root window does not bracket a root: ${kind}`);
  }
  for (let iteration = 0; iteration < 200; iteration += 1) {
    const midpoint = lower + (upper - lower) / 2;
    const midpointResidual = evaluate(kind, midpoint).rootResidual;
    if (Math.abs(midpointResidual) <= 1e-15) return midpoint;
    if (Math.sign(midpointResidual) === Math.sign(lowerResidual)) {
      lower = midpoint;
      lowerResidual = midpointResidual;
    } else {
      upper = midpoint;
    }
  }
  return lower + (upper - lower) / 2;
}

let radialSum = 0;
let tangentialSum = 0;
const records = branches.map((branch) => {
  const delta = solveRoot(branch.kind, ...branch.window);
  const point = evaluate(branch.kind, delta);
  radialSum += point.radialContribution;
  tangentialSum += point.tangentialContribution;
  const [absoluteLower, absoluteUpper] = branch.absoluteTransmitterFactor;
  return {
    id: branch.id,
    kind: branch.kind,
    deltaWindow: branch.window,
    deltaPoint: delta,
    certifiedAccelerationWeightInterval: [
      1 / absoluteUpper,
      1 / absoluteLower,
    ],
    point,
  };
});

const radialDemandRatio = radialSum / (pitchAmplitude - 1);
const angularRateSlope = tangentialSum / radialDemandRatio;

console.log(
  JSON.stringify(
    {
      schema: "a1_transmitter_side_turn_diagnostic/v1",
      claimGrade: "diagnostic_formula_evaluation",
      certificationBoundary:
        "weight intervals inherit the existing outward transmitter-factor bounds; point sums are not interval certificates",
      candidate: {
        pitchAmplitude,
        bStar,
        theta: 0,
        activeLabels: branches.map((branch) => branch.id),
      },
      records,
      aggregate: {
        radialSum,
        tangentialSum,
        radialDemandRatio,
        angularRateSlope,
        constantAngularRatePointResidual: tangentialSum,
      },
      promotion: {
        accelerationWeights: "derived_interval_pass",
        signedPlayback: "point_diagnostic_only",
        radialAndTangentialSums: "point_diagnostic_only",
        actionAndConservedAccounts: "blocked_missing_accepted_causal_wake_state",
      },
    },
    null,
    2,
  ),
);
