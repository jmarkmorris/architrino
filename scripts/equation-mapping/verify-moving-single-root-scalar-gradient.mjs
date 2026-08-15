#!/usr/bin/env node

import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

import {
  runReceiverWakeGradientVerification,
} from "./verify-receiver-wake-gradient.mjs";

const FIELD_SPEED = 1;
const TRANSMITTER_RADIUS = 0.7;
const ANGULAR_SPEED = 0.4;
const TRANSMITTER_Z = 0.15;
const TRANSMITTER_SPEED = TRANSMITTER_RADIUS * ANGULAR_SPEED;
const RECEPTION_TIME = 0;
const DECLARED_ROOT = -1.1;
const SIGNED_COUPLING = -0.9;
const CHART_RADIUS = 0.02;
const ROOT_TOLERANCE = 8e-15;
const GRADIENT_RESIDUAL_TOLERANCE = 2e-9;
const STENCIL_AGREEMENT_TOLERANCE = 2e-9;
const INVERSE_SQUARE_RESIDUAL_FLOOR = 0.1;
const STEPS = [2e-3, 1e-3, 5e-4, 2.5e-4, 1.25e-4];

const IDENTITY = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const DECLARED_DIRECTION = [0.4, -0.3, Math.sqrt(0.75)];

function add(left, right) {
  return left.map((component, index) => component + right[index]);
}

function subtract(left, right) {
  return left.map((component, index) => component - right[index]);
}

function scale(vector, scalar) {
  return vector.map((component) => component * scalar);
}

function dot(left, right) {
  return left.reduce(
    (total, component, index) => total + component * right[index],
    0,
  );
}

function norm(vector) {
  return Math.hypot(...vector);
}

function maxAbsVector(vector) {
  return Math.max(...vector.map((component) => Math.abs(component)));
}

function circularPosition(emissionTime) {
  return [
    TRANSMITTER_RADIUS * Math.cos(ANGULAR_SPEED * emissionTime),
    TRANSMITTER_RADIUS * Math.sin(ANGULAR_SPEED * emissionTime),
    TRANSMITTER_Z,
  ];
}

function circularVelocity(emissionTime) {
  return [
    -TRANSMITTER_RADIUS * ANGULAR_SPEED *
      Math.sin(ANGULAR_SPEED * emissionTime),
    TRANSMITTER_RADIUS * ANGULAR_SPEED *
      Math.cos(ANGULAR_SPEED * emissionTime),
    0,
  ];
}

const RECEIVER_POSITION = add(
  circularPosition(DECLARED_ROOT),
  scale(
    DECLARED_DIRECTION,
    FIELD_SPEED * (RECEPTION_TIME - DECLARED_ROOT),
  ),
);

const ANALYTIC_TRANSMITTER_FLOOR = FIELD_SPEED - TRANSMITTER_SPEED;
const ROOT_SHIFT_BOUND = CHART_RADIUS / ANALYTIC_TRANSMITTER_FLOOR;
const CERTIFIED_ROOT_INTERVAL = [
  DECLARED_ROOT - ROOT_SHIFT_BOUND,
  DECLARED_ROOT + ROOT_SHIFT_BOUND,
];
const ANALYTIC_SEPARATION_FLOOR =
  FIELD_SPEED * (RECEPTION_TIME - CERTIFIED_ROOT_INTERVAL[1]);

function assertInsideCertifiedChart(receiverPosition) {
  const distance = norm(subtract(receiverPosition, RECEIVER_POSITION));
  assert.ok(
    distance <= CHART_RADIUS + 2e-15,
    `receiver left certified chart: distance=${distance}`,
  );
}

function rootRecord(receiverPosition, emissionTime) {
  const displacement = subtract(
    receiverPosition,
    circularPosition(emissionTime),
  );
  const separation = norm(displacement);
  const direction = scale(displacement, 1 / separation);
  const velocity = circularVelocity(emissionTime);
  const transmitterFactor = FIELD_SPEED - dot(direction, velocity);
  const residual =
    separation -
    FIELD_SPEED * (RECEPTION_TIME - emissionTime);
  return {
    emissionTime,
    residual,
    separation,
    direction,
    transmitterFactor,
  };
}

function solveRootByCertifiedNewton(receiverPosition) {
  assertInsideCertifiedChart(receiverPosition);
  let emissionTime = DECLARED_ROOT;
  for (let iteration = 0; iteration < 32; iteration += 1) {
    const record = rootRecord(receiverPosition, emissionTime);
    assert.ok(
      record.transmitterFactor >= ANALYTIC_TRANSMITTER_FLOOR - 2e-15,
      "moving-root chart lost its analytic transmitter-factor floor",
    );
    const correction = record.residual / record.transmitterFactor;
    const next = emissionTime - correction;
    assert.ok(
      next >= CERTIFIED_ROOT_INTERVAL[0] - 2e-14 &&
        next <= CERTIFIED_ROOT_INTERVAL[1] + 2e-14,
      `Newton root left certified interval: ${next}`,
    );
    emissionTime = next;
    if (Math.abs(correction) <= ROOT_TOLERANCE) {
      const finalRecord = rootRecord(receiverPosition, emissionTime);
      assert.ok(
        Math.abs(finalRecord.residual) <= 3e-14,
        `root residual ${finalRecord.residual} exceeds tolerance`,
      );
      return finalRecord;
    }
  }
  throw new Error("safeguarded Newton root solve did not converge");
}

function rootSelectedScalar(receiverPosition, radialPower = 1) {
  const record = solveRootByCertifiedNewton(receiverPosition);
  const branchSign = Math.sign(record.transmitterFactor);
  assert.equal(branchSign, 1, "certified circular chart must remain one-sign");
  return (
    (SIGNED_COUPLING * branchSign) /
    record.separation ** radialPower
  );
}

function perturb(vector, axis, amount) {
  const result = [...vector];
  result[axis] += amount;
  return result;
}

function centeredGradient(scalar, step) {
  return IDENTITY.map((_, axis) => {
    const plus = scalar(perturb(RECEIVER_POSITION, axis, step));
    const minus = scalar(perturb(RECEIVER_POSITION, axis, -step));
    return (plus - minus) / (2 * step);
  });
}

function fivePointGradient(scalar, step) {
  return IDENTITY.map((_, axis) => {
    const plusTwo = scalar(perturb(RECEIVER_POSITION, axis, 2 * step));
    const plusOne = scalar(perturb(RECEIVER_POSITION, axis, step));
    const minusOne = scalar(perturb(RECEIVER_POSITION, axis, -step));
    const minusTwo = scalar(perturb(RECEIVER_POSITION, axis, -2 * step));
    return (
      -plusTwo + 8 * plusOne - 8 * minusOne + minusTwo
    ) / (12 * step);
  });
}

function richardsonGradient(scalar, step) {
  const coarse = centeredGradient(scalar, step);
  const fine = centeredGradient(scalar, step / 2);
  return coarse.map(
    (component, index) => (4 * fine[index] - component) / 3,
  );
}

function chartSampleRecords() {
  return [
    RECEIVER_POSITION,
    ...IDENTITY.flatMap((_, axis) => [
      perturb(RECEIVER_POSITION, axis, CHART_RADIUS),
      perturb(RECEIVER_POSITION, axis, -CHART_RADIUS),
    ]),
  ].map((receiverPosition) => {
    const record = solveRootByCertifiedNewton(receiverPosition);
    return {
      receiverOffset: subtract(receiverPosition, RECEIVER_POSITION),
      emissionTime: record.emissionTime,
      rootResidual: record.residual,
      separation: record.separation,
      transmitterFactor: record.transmitterFactor,
    };
  });
}

export function runMovingSingleRootScalarGradientVerification() {
  const existingReport = runReceiverWakeGradientVerification();
  const oracle = existingReport.controls.find(
    (control) => control.id === "uniform_circular_history",
  );
  assert.ok(oracle, "pre-existing circular ledger oracle is missing");
  assert.equal(existingReport.fieldSpeed, FIELD_SPEED);
  assert.ok(
    Math.abs(oracle.emissionTime - DECLARED_ROOT) <= 3e-14,
    "pre-existing oracle root drifted",
  );
  assert.ok(
    Math.abs(oracle.separation - -DECLARED_ROOT) <= 3e-14,
    "pre-existing oracle separation drifted",
  );

  const ledgerAcceleration = scale(
    DECLARED_DIRECTION,
    (SIGNED_COUPLING * FIELD_SPEED) /
      (oracle.separation ** 2 * Math.abs(oracle.transmitterFactor)),
  );
  const expectedScalarGradient = scale(ledgerAcceleration, -1);
  const scalar = (receiverPosition) =>
    rootSelectedScalar(receiverPosition, 1);
  const rows = STEPS.map((step) => {
    const richardson = richardsonGradient(scalar, step);
    const fivePoint = fivePointGradient(scalar, step / 2);
    return {
      step,
      richardson,
      fivePoint,
      scalarGradientVersusLedgerResidual: add(
        richardson,
        ledgerAcceleration,
      ),
      maximumAbsoluteResidual: maxAbsVector(
        add(richardson, ledgerAcceleration),
      ),
      maximumStencilDisagreement: maxAbsVector(
        subtract(richardson, fivePoint),
      ),
    };
  });
  const final = rows.at(-1);
  const maximumAbsoluteResidualAcrossRows = Math.max(
    ...rows.map((row) => row.maximumAbsoluteResidual),
  );
  const maximumStencilDisagreementAcrossRows = Math.max(
    ...rows.map((row) => row.maximumStencilDisagreement),
  );
  assert.ok(
    final.maximumAbsoluteResidual <= GRADIENT_RESIDUAL_TOLERANCE,
    `scalar-gradient residual ${final.maximumAbsoluteResidual} exceeds tolerance`,
  );
  assert.ok(
    final.maximumStencilDisagreement <= STENCIL_AGREEMENT_TOLERANCE,
    `scalar-gradient stencils disagree by ${final.maximumStencilDisagreement}`,
  );

  const inverseSquareGradient = richardsonGradient(
    (receiverPosition) => rootSelectedScalar(receiverPosition, 2),
    STEPS.at(-1),
  );
  const inverseSquareResidual = add(
    inverseSquareGradient,
    ledgerAcceleration,
  );
  const inverseSquareMaximumResidual = maxAbsVector(inverseSquareResidual);
  assert.ok(
    inverseSquareMaximumResidual >= INVERSE_SQUARE_RESIDUAL_FLOOR,
    "raw inverse-square scalar unexpectedly reproduced the ledger",
  );

  assert.throws(
    () => rootSelectedScalar(
      perturb(RECEIVER_POSITION, 0, CHART_RADIUS * 1.01),
    ),
    /receiver left certified chart/u,
  );

  const samples = chartSampleRecords();
  const observedMinimumSeparation = Math.min(
    ...samples.map((sample) => sample.separation),
  );
  const observedMinimumTransmitterFactor = Math.min(
    ...samples.map((sample) => sample.transmitterFactor),
  );
  assert.ok(
    observedMinimumSeparation >= ANALYTIC_SEPARATION_FLOOR - 2e-14,
    "sampled chart violated its analytic separation floor",
  );
  assert.ok(
    observedMinimumTransmitterFactor >=
      ANALYTIC_TRANSMITTER_FLOOR - 2e-15,
    "sampled chart violated its analytic transmitter-factor floor",
  );

  return {
    schema: "moving_single_root_scalar_gradient_verification/v1",
    authority:
      "analytic theorem reference plus regular-chart numerical implementation check",
    status: "verified_regular_only",
    fieldSpeed: FIELD_SPEED,
    theoremIdentity:
      "Phi_b=C_b*sign(D_b)/r_b implies -grad(Phi_b)=C_b*c_f*n_b/(r_b^2*abs(D_b)) on one connected simple-root chart",
    independence:
      "Scalar values use a safeguarded Newton root solve and numerical differentiation. The ledger vector uses the unchanged pre-existing circular-root verifier record and the canonical row. No analytic scalar gradient or EOM solver sensitivity is imported.",
    chartCertificate: {
      history: "uniform_circular_transmitter",
      receptionTime: RECEPTION_TIME,
      declaredRoot: DECLARED_ROOT,
      receiverPosition: RECEIVER_POSITION,
      chartRadius: CHART_RADIUS,
      transmitterSpeed: TRANSMITTER_SPEED,
      analyticTransmitterFactorFloor: ANALYTIC_TRANSMITTER_FLOOR,
      rootShiftBound: ROOT_SHIFT_BOUND,
      certifiedRootInterval: CERTIFIED_ROOT_INTERVAL,
      analyticSeparationFloor: ANALYTIC_SEPARATION_FLOOR,
      proof:
        "The source speed is 0.28<1, so D_b>=1-0.28=0.72 and the causal residual is strictly increasing in emission time. A receiver displacement of norm at most 0.02 shifts the unique root by at most 0.02/0.72.",
      samples,
      observedMinimumSeparation,
      observedMinimumTransmitterFactor,
    },
    oracle: {
      sourceSchema: existingReport.schema,
      sourceControl: oracle.id,
      emissionTime: oracle.emissionTime,
      separation: oracle.separation,
      transmitterFactor: oracle.transmitterFactor,
      ledgerAcceleration,
      expectedScalarGradient,
    },
    rows,
    finalMaximumAbsoluteResidual: final.maximumAbsoluteResidual,
    finalMaximumStencilDisagreement: final.maximumStencilDisagreement,
    maximumAbsoluteResidualAcrossRows,
    maximumStencilDisagreementAcrossRows,
    negativeControls: {
      rawInverseSquareScalar: {
        status: "rejected_wrong_radial_scaling",
        gradient: inverseSquareGradient,
        residual: inverseSquareResidual,
        maximumAbsoluteResidual: inverseSquareMaximumResidual,
      },
      outsideCertifiedChart: {
        status: "not_advanced_outside_regular_chart",
      },
    },
    nonclaims: [
      "global scalar existence",
      "chart gluing",
      "fold or coincidence continuation",
      "self-diagonal continuation",
      "action or conservation closure",
      "EOM solver acceptance",
    ],
    conclusion:
      "The moving simple-root scalar gradient reproduces the unchanged canonical acceleration ledger on the certified regular circular chart. Singular boundaries and global extension remain unresolved.",
  };
}

function main() {
  const report = runMovingSingleRootScalarGradientVerification();
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
