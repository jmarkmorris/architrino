#!/usr/bin/env node

import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const ROOT_TOLERANCE = 2e-14;
const JACOBIAN_TOLERANCE = 8e-8;
const STENCIL_AGREEMENT_TOLERANCE = 2e-8;

const IDENTITY = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const AFFINE_TARGET = [
  [0.14013571617094375, 0.22728543925230466, -0.22042652350689246],
  [0.22728543925230466, -0.06190105320672467, -0.14005636609146133],
  [-0.22042652350689246, -0.14005636609146133, -0.06745524656559408],
];

const CIRCULAR_TARGET = [
  [-0.4282579966360694, -0.25967030476373365, 0.5625411129852202],
  [-0.25967030476373365, -0.3970648346496868, -0.6117394759580882],
  [0.5625411129852202, -0.6117394759580883, 0.7033597215762423],
];

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

function outer(left, right) {
  return left.map((leftComponent) =>
    right.map((rightComponent) => leftComponent * rightComponent),
  );
}

function matrixAdd(left, right) {
  return left.map((row, rowIndex) =>
    row.map((component, columnIndex) =>
      component + right[rowIndex][columnIndex],
    ),
  );
}

function matrixSubtract(left, right) {
  return left.map((row, rowIndex) =>
    row.map((component, columnIndex) =>
      component - right[rowIndex][columnIndex],
    ),
  );
}

function matrixScale(matrix, scalar) {
  return matrix.map((row) =>
    row.map((component) => component * scalar),
  );
}

function maxAbsMatrix(matrix) {
  return Math.max(...matrix.flat().map((component) => Math.abs(component)));
}

function bisect(fn, bracket) {
  let [left, right] = bracket;
  let leftValue = fn(left);
  let rightValue = fn(right);
  assert.ok(
    leftValue === 0 ||
      rightValue === 0 ||
      Math.sign(leftValue) !== Math.sign(rightValue),
    `root is not bracketed: left=${leftValue}, right=${rightValue}`,
  );
  if (leftValue === 0) return left;
  if (rightValue === 0) return right;

  for (let iteration = 0; iteration < 240; iteration += 1) {
    const middle = (left + right) / 2;
    const middleValue = fn(middle);
    if (
      middleValue === 0 ||
      right - left <=
        ROOT_TOLERANCE * Math.max(1, Math.abs(middle))
    ) {
      return middle;
    }
    if (Math.sign(middleValue) === Math.sign(leftValue)) {
      left = middle;
      leftValue = middleValue;
    } else {
      right = middle;
      rightValue = middleValue;
    }
  }
  throw new Error("bisection did not converge");
}

function causalResidual({
  history,
  receiverPosition,
  receptionTime,
  emissionTime,
  fieldSpeed,
}) {
  return (
    norm(subtract(receiverPosition, history.position(emissionTime))) -
    fieldSpeed * (receptionTime - emissionTime)
  );
}

function bracketedRoot({
  history,
  receiverPosition,
  receptionTime,
  bracket,
  fieldSpeed,
}) {
  const residual = (emissionTime) =>
    causalResidual({
      history,
      receiverPosition,
      receptionTime,
      emissionTime,
      fieldSpeed,
    });
  const scanCells = 1024;
  const signChangeBrackets = [];
  let previousTime = bracket[0];
  let previousValue = residual(previousTime);
  for (let cell = 1; cell <= scanCells; cell += 1) {
    const time =
      bracket[0] +
      ((bracket[1] - bracket[0]) * cell) / scanCells;
    const value = residual(time);
    if (
      previousValue === 0 ||
      value === 0 ||
      Math.sign(previousValue) !== Math.sign(value)
    ) {
      signChangeBrackets.push([previousTime, time]);
    }
    previousTime = time;
    previousValue = value;
  }
  assert.equal(
    signChangeBrackets.length,
    1,
    "declared bracket must contain exactly one scanned sign change",
  );
  return bisect(residual, signChangeBrackets[0]);
}

function closedAffineRoot({
  history,
  receiverPosition,
  receptionTime,
  bracket,
  fieldSpeed,
}) {
  assert.equal(receptionTime, 0);
  const displacementAtZero = subtract(
    receiverPosition,
    history.positionAtZero,
  );
  const velocity = history.constantVelocity;
  const quadratic =
    dot(velocity, velocity) - fieldSpeed * fieldSpeed;
  const linear = -2 * dot(displacementAtZero, velocity);
  const constant = dot(displacementAtZero, displacementAtZero);
  const discriminant = linear * linear - 4 * quadratic * constant;
  assert.ok(discriminant > 0, "affine root discriminant must be positive");
  const squareRoot = Math.sqrt(discriminant);
  const candidates = [
    (-linear - squareRoot) / (2 * quadratic),
    (-linear + squareRoot) / (2 * quadratic),
  ].filter(
    (candidate) =>
      candidate >= bracket[0] &&
      candidate <= bracket[1] &&
      candidate < receptionTime,
  );
  assert.equal(candidates.length, 1, "affine bracket must select one root");
  return candidates[0];
}

function canonicalAcceleration({
  history,
  receiverPosition,
  receptionTime,
  bracket,
  rootMethod,
  fieldSpeed,
  signedCoupling,
}) {
  const emissionTime = rootMethod({
    history,
    receiverPosition,
    receptionTime,
    bracket,
    fieldSpeed,
  });
  const displacement = subtract(
    receiverPosition,
    history.position(emissionTime),
  );
  const separation = norm(displacement);
  assert.ok(separation > 0, "regular row requires positive separation");
  const direction = scale(displacement, 1 / separation);
  const transmitterFactor =
    fieldSpeed - dot(direction, history.velocity(emissionTime));
  assert.ok(
    Math.abs(transmitterFactor) > 1e-10,
    "regular row requires a nonzero transmitter factor",
  );
  const coefficient =
    (signedCoupling * fieldSpeed) /
    (separation * separation * Math.abs(transmitterFactor));
  return {
    acceleration: scale(direction, coefficient),
    emissionTime,
    separation,
    transmitterFactor,
  };
}

function perturb(vector, axis, amount) {
  const result = [...vector];
  result[axis] += amount;
  return result;
}

function centeredJacobian(request, step) {
  const columns = IDENTITY.map((_, axis) => {
    const plus = canonicalAcceleration({
      ...request,
      receiverPosition: perturb(
        request.receiverPosition,
        axis,
        step,
      ),
    }).acceleration;
    const minus = canonicalAcceleration({
      ...request,
      receiverPosition: perturb(
        request.receiverPosition,
        axis,
        -step,
      ),
    }).acceleration;
    return scale(subtract(plus, minus), 1 / (2 * step));
  });
  return IDENTITY.map((_, row) =>
    columns.map((column) => column[row]),
  );
}

function fivePointJacobian(request, step) {
  const columns = IDENTITY.map((_, axis) => {
    const plusTwo = canonicalAcceleration({
      ...request,
      receiverPosition: perturb(
        request.receiverPosition,
        axis,
        2 * step,
      ),
    }).acceleration;
    const plusOne = canonicalAcceleration({
      ...request,
      receiverPosition: perturb(
        request.receiverPosition,
        axis,
        step,
      ),
    }).acceleration;
    const minusOne = canonicalAcceleration({
      ...request,
      receiverPosition: perturb(
        request.receiverPosition,
        axis,
        -step,
      ),
    }).acceleration;
    const minusTwo = canonicalAcceleration({
      ...request,
      receiverPosition: perturb(
        request.receiverPosition,
        axis,
        -2 * step,
      ),
    }).acceleration;
    return scale(
      add(
        subtract(scale(plusOne, 8), plusTwo),
        subtract(minusTwo, scale(minusOne, 8)),
      ),
      1 / (12 * step),
    );
  });
  return IDENTITY.map((_, row) =>
    columns.map((column) => column[row]),
  );
}

function richardsonJacobian(request, step) {
  const coarse = centeredJacobian(request, step);
  const fine = centeredJacobian(request, step / 2);
  return matrixScale(
    matrixSubtract(matrixScale(fine, 4), coarse),
    1 / 3,
  );
}

function staticExpected({
  history,
  receiverPosition,
  signedCoupling,
}) {
  const displacement = subtract(
    receiverPosition,
    history.positionAtZero,
  );
  const separation = norm(displacement);
  return matrixScale(
    matrixSubtract(
      matrixScale(IDENTITY, separation * separation),
      matrixScale(outer(displacement, displacement), 3),
    ),
    signedCoupling / separation ** 5,
  );
}

function verifyJacobianControl({
  id,
  request,
  target,
  steps,
  compareFivePoint = false,
}) {
  const rows = steps.map((step) => {
    const richardson = richardsonJacobian(request, step);
    const targetError = maxAbsMatrix(
      matrixSubtract(richardson, target),
    );
    const fivePoint = compareFivePoint
      ? fivePointJacobian(request, step / 2)
      : null;
    const stencilAgreement = fivePoint
      ? maxAbsMatrix(matrixSubtract(richardson, fivePoint))
      : null;
    return {
      step,
      targetError,
      stencilAgreement,
    };
  });
  const final = rows.at(-1);
  assert.ok(
    final.targetError <= JACOBIAN_TOLERANCE,
    `${id} target error ${final.targetError} exceeds tolerance`,
  );
  if (compareFivePoint) {
    assert.ok(
      final.stencilAgreement <= STENCIL_AGREEMENT_TOLERANCE,
      `${id} stencil disagreement ${final.stencilAgreement} exceeds tolerance`,
    );
  }
  const nominal = canonicalAcceleration(request);
  return {
    id,
    status: "verified_regular_only",
    emissionTime: nominal.emissionTime,
    separation: nominal.separation,
    transmitterFactor: nominal.transmitterFactor,
    target,
    rows,
  };
}

function verifyFoldModel() {
  const sharpRows = [1e-2, 2.5e-3, 6.25e-4].map((lambda) => {
    const contribution = 1 / Math.sqrt(lambda);
    const derivative = -0.5 / lambda ** 1.5;
    return {
      lambda,
      contribution,
      derivative,
      contributionScaled: contribution * Math.sqrt(lambda),
      derivativeScaled: derivative * lambda ** 1.5,
    };
  });
  for (const row of sharpRows) {
    assert.ok(Math.abs(row.contributionScaled - 1) <= 1e-14);
    assert.ok(Math.abs(row.derivativeScaled + 0.5) <= 1e-14);
  }

  const regularizedContribution = (lambda, width, shape) =>
    1 / Math.sqrt(lambda + shape * width * width);
  const regularizedDerivative = (lambda, width, shape) =>
    -0.5 / (lambda + shape * width * width) ** 1.5;
  const regulatorRows = [1e-1, 5e-2, 2.5e-2].map((width) => {
    const narrowShape = 0.25;
    const unitShape = 1;
    const narrowContribution = regularizedContribution(
      0,
      width,
      narrowShape,
    );
    const narrowDerivative = regularizedDerivative(
      0,
      width,
      narrowShape,
    );
    const unitContribution = regularizedContribution(
      0,
      width,
      unitShape,
    );
    const unitDerivative = regularizedDerivative(
      0,
      width,
      unitShape,
    );
    return {
      width,
      family: "1/sqrt(lambda + shape*width^2)",
      narrowShape,
      unitShape,
      narrowContribution,
      narrowDerivative,
      unitContribution,
      unitDerivative,
      contributionRatio:
        narrowContribution / unitContribution,
      derivativeRatio:
        narrowDerivative / unitDerivative,
    };
  });
  for (const row of regulatorRows) {
    assert.ok(Math.abs(row.contributionRatio - 2) <= 1e-14);
    assert.ok(Math.abs(row.derivativeRatio - 8) <= 1e-14);
  }
  return {
    id: "ordinary_fold_local_model",
    status: "boundary_prescription_not_selected",
    normalForm: "g(u,lambda)=u^2-lambda",
    sharpRows,
    regulatorRows,
    conclusion:
      "Both regulators recover the open-domain scaling and disagree at the boundary; the comparison supplies no unique fold Jacobian extension.",
  };
}

export function runReceiverWakeGradientVerification() {
  const fieldSpeed = 1;
  const steps = [2e-3, 1e-3, 5e-4, 2.5e-4, 1.25e-4];

  const staticHistory = {
    positionAtZero: [0.2, -0.1, 0.3],
    position: () => [0.2, -0.1, 0.3],
    velocity: () => [0, 0, 0],
  };
  const staticRequest = {
    history: staticHistory,
    receiverPosition: [1.1, 0.7, -0.4],
    receptionTime: 0,
    bracket: [-3, -0.1],
    rootMethod: bracketedRoot,
    fieldSpeed,
    signedCoupling: -0.8,
  };
  const staticControl = verifyJacobianControl({
    id: "static_transmitter",
    request: staticRequest,
    target: staticExpected({
      history: staticHistory,
      receiverPosition: staticRequest.receiverPosition,
      signedCoupling: staticRequest.signedCoupling,
    }),
    steps,
  });

  const affineHistory = {
    positionAtZero: [0.3, -0.4, 0.2],
    constantVelocity: [0.22, -0.17, 0.09],
    position(emissionTime) {
      return add(
        this.positionAtZero,
        scale(this.constantVelocity, emissionTime),
      );
    },
    velocity() {
      return [...this.constantVelocity];
    },
  };
  const affineBase = {
    history: affineHistory,
    receiverPosition: [1.2, 0.5, -0.6],
    receptionTime: 0,
    bracket: [-4, -0.01],
    fieldSpeed,
    signedCoupling: -0.7,
  };
  const affineClosedControl = verifyJacobianControl({
    id: "constant_velocity_closed_root",
    request: {
      ...affineBase,
      rootMethod: closedAffineRoot,
    },
    target: AFFINE_TARGET,
    steps,
  });
  const affineBracketControl = verifyJacobianControl({
    id: "constant_velocity_bracketed_root",
    request: {
      ...affineBase,
      rootMethod: bracketedRoot,
    },
    target: AFFINE_TARGET,
    steps,
  });
  assert.ok(
    Math.abs(
      affineClosedControl.emissionTime -
        affineBracketControl.emissionTime
    ) <= 3e-14,
    "closed and bracketed affine roots disagree",
  );

  const radius = 0.7;
  const angularSpeed = 0.4;
  const circularHistory = {
    position(emissionTime) {
      return [
        radius * Math.cos(angularSpeed * emissionTime),
        radius * Math.sin(angularSpeed * emissionTime),
        0.15,
      ];
    },
    velocity(emissionTime) {
      return [
        -radius * angularSpeed * Math.sin(angularSpeed * emissionTime),
        radius * angularSpeed * Math.cos(angularSpeed * emissionTime),
        0,
      ];
    },
  };
  const declaredCircularRoot = -1.1;
  const circularDirection = [0.4, -0.3, Math.sqrt(0.75)];
  const circularRequest = {
    history: circularHistory,
    receiverPosition: add(
      circularHistory.position(declaredCircularRoot),
      scale(circularDirection, -declaredCircularRoot),
    ),
    receptionTime: 0,
    bracket: [-4, -0.001],
    rootMethod: bracketedRoot,
    fieldSpeed,
    signedCoupling: -0.9,
  };
  const circularControl = verifyJacobianControl({
    id: "uniform_circular_history",
    request: circularRequest,
    target: CIRCULAR_TARGET,
    steps,
    compareFivePoint: true,
  });
  assert.ok(
    Math.abs(circularControl.emissionTime - declaredCircularRoot) <=
      3e-14,
    "circular control did not preserve the declared root",
  );

  return {
    schema: "receiver_wake_gradient_independent_verification/v1",
    authority: "regular-domain numerical verifier only",
    method:
      "Direct canonical-acceleration evaluation, a 1024-cell sign-change isolation scan for bracketed roots, centered finite differences, Richardson extrapolation, and an independent five-point circular stencil. The analytic Jacobian scaffold and EOM sensitivity implementation are not imported.",
    fieldSpeed,
    controls: [
      staticControl,
      affineClosedControl,
      affineBracketControl,
      circularControl,
    ],
    foldModel: verifyFoldModel(),
    conclusion:
      "Regular fixed-reception 3D rows verify. Fold, coincident, and self-diagonal prescriptions remain unselected and unresolved.",
  };
}

function main() {
  const report = runReceiverWakeGradientVerification();
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
