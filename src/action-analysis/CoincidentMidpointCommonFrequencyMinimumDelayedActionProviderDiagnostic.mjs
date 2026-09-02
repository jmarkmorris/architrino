import { createHash } from "node:crypto";

export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_MINIMUM_ACTION_PROTOCOL_SCHEMA =
  "action-analysis/coincident-midpoint-common-frequency-minimum-delayed-action-provider-protocol.v1";
export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_MINIMUM_ACTION_RESULT_SCHEMA =
  "action-analysis/coincident-midpoint-common-frequency-minimum-delayed-action-provider-result.v1";
export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_MINIMUM_ACTION_SUMMARY_SCHEMA =
  "action-analysis/coincident-midpoint-common-frequency-minimum-delayed-action-provider-summary.v1";

function validateScientificIdentity(protocol) {
  const identity = protocol.sourceConfiguration?.scientificIdentity;
  if (identity?.assemblyId !== "asm-2a289a6fe32f64922ab71bae973acc80" ||
      identity?.modelRevisionSha256 !==
        "2a289a6fe32f64922ab71bae973acc80bef8ebc2369329a26822f3f0d7f159d6") {
    throw new TypeError(
      "minimum action provider requires the exact coincident-midpoint common-frequency scientific identity.",
    );
  }
}

const EXPECTED_CONTROL = Object.freeze({
  protocolHash:
    "a3d1bd614f99aa2eef8dcae172e1b60b5a3ca3719cb9a8ba6500de7ad4e68fc6",
  resultHash:
    "6ad21456a76efd9fbbc841b60e4d593e36382891ab356a3fd79f73ef5c231d6f",
  summaryHash:
    "96660a3111e235a1d663265c9412a19ece45bcb1b1ae58a1f1f9cd5c05fcafdd",
});
const EXPECTED_OFFSETS = Object.freeze([-1, -0.5, 0, 0.5, 1]);
const EXPECTED_STEPS = Object.freeze([2e-4, 1e-4, 5e-5]);

function canonicalize(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

export function canonicalActionJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function sha256Action(value) {
  return createHash("sha256").update(canonicalActionJson(value)).digest("hex");
}

function exactArray(actual, expected, label) {
  if (!Array.isArray(actual) ||
      actual.length !== expected.length ||
      actual.some((value, index) => value !== expected[index])) {
    throw new TypeError(`${label} must equal ${JSON.stringify(expected)}.`);
  }
}

function finite(value, label) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${label} must be finite.`);
  }
  return value;
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function gaussianDelta(value, eta) {
  return (
    Math.exp(-0.5 * (value / eta) ** 2) /
    (Math.sqrt(2 * Math.PI) * eta)
  );
}

function gaussianDeltaDerivative(value, eta) {
  return -(value / (eta * eta)) * gaussianDelta(value, eta);
}

function simpsonIntegral(fn, left, right, subdivisions) {
  if (!Number.isInteger(subdivisions) ||
      subdivisions <= 0 ||
      subdivisions % 2 !== 0 ||
      !(right > left)) {
    throw new TypeError(
      "Simpson integration requires a positive even subdivision count.",
    );
  }
  const step = (right - left) / subdivisions;
  let total = fn(left) + fn(right);
  for (let index = 1; index < subdivisions; index += 1) {
    total += (index % 2 === 0 ? 2 : 4) * fn(left + index * step);
  }
  return (total * step) / 3;
}

function effectiveTailKernel({
  radius,
  constraint,
  eta,
  lowerLimitInEta,
  subdivisions,
}) {
  const characteristic = constraint + radius;
  const lower = lowerLimitInEta * eta;
  return simpsonIntegral(
    (sourceConstraint) => (
      gaussianDelta(sourceConstraint, eta) /
      (characteristic - sourceConstraint) ** 2
    ),
    lower,
    constraint,
    subdivisions,
  );
}

function solveAntipodalPartnerRoot(beta, bracket) {
  let [left, right] = bracket;
  const residual = (phaseDelay) => (
    phaseDelay - 2 * beta * Math.cos(phaseDelay / 2)
  );
  let leftValue = residual(left);
  let rightValue = residual(right);
  if (!(leftValue < 0 && rightValue > 0)) {
    throw new TypeError("rotating-chart partner root is not bracketed.");
  }
  for (let iteration = 0; iteration < 200; iteration += 1) {
    const middle = (left + right) / 2;
    const middleValue = residual(middle);
    if (right - left <= 2e-15) {
      return {
        phaseDelay: middle,
        residual: middleValue,
      };
    }
    if (middleValue > 0) {
      right = middle;
      rightValue = middleValue;
    } else {
      left = middle;
      leftValue = middleValue;
    }
  }
  throw new Error(
    `rotating root did not converge: left=${leftValue}, right=${rightValue}`,
  );
}

function circularPosition(time, angularSpeed, phase = 0) {
  const angle = angularSpeed * time + phase;
  return [Math.cos(angle), Math.sin(angle), 0];
}

function futureBoundaryIntegrand({
  transmitterPosition,
  receiverPosition,
  emissionTime,
  receptionTime,
  eta,
}) {
  const separation = subtract(receiverPosition, transmitterPosition);
  const radius = norm(separation);
  const direction = scale(separation, 1 / radius);
  const constraint = receptionTime - emissionTime - radius;
  const density = gaussianDelta(constraint, eta) / (radius * radius);
  return {
    radius,
    constraint,
    direction,
    density,
    vector: scale(direction, density),
  };
}

function validateControlSummary(summary, protocol) {
  if (!summary ||
      summary.verifierProtocolHash !== EXPECTED_CONTROL.protocolHash ||
      summary.resultHash !== EXPECTED_CONTROL.resultHash ||
      summary.summaryHash !== EXPECTED_CONTROL.summaryHash ||
      protocol.sealedCoincidentMidpointCommonFrequencyControl?.protocolHash !== EXPECTED_CONTROL.protocolHash ||
      protocol.sealedCoincidentMidpointCommonFrequencyControl?.resultHash !== EXPECTED_CONTROL.resultHash ||
      protocol.sealedCoincidentMidpointCommonFrequencyControl?.summaryHash !== EXPECTED_CONTROL.summaryHash ||
      protocol.sealedCoincidentMidpointCommonFrequencyControl?.radiusOrHistoryMutationAuthorized !== false) {
    throw new TypeError("sealed coincident-midpoint common-frequency three-axis circular configuration diagnostic control does not match.");
  }
}

export function validateCoincidentMidpointCommonFrequencyMinimumActionProtocol(rawProtocol) {
  if (!rawProtocol ||
      typeof rawProtocol !== "object" ||
      Array.isArray(rawProtocol) ||
      rawProtocol.schema !== COINCIDENT_MIDPOINT_COMMON_FREQUENCY_MINIMUM_ACTION_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `minimum action provider requires ${COINCIDENT_MIDPOINT_COMMON_FREQUENCY_MINIMUM_ACTION_PROTOCOL_SCHEMA}.`,
    );
  }
  validateScientificIdentity(rawProtocol);
  const boundary = rawProtocol.claimBoundary;
  if (rawProtocol.claimGrade !== "diagnostic-action-provider-entry-gate" ||
      boundary?.diagnosticOnly !== true ||
      boundary?.score !== null ||
      boundary?.candidateSelection !== false ||
      boundary?.physicalRealization !== false ||
      boundary?.quantizationClaim !== false ||
      boundary?.campaign1Progress !== false ||
      boundary?.eomSolverInvoked !== false ||
      boundary?.prescribedRotatingChartIsSolution !== false) {
    throw new TypeError("minimum action provider claim boundary drifted.");
  }
  const action = rawProtocol.actionCandidate;
  if (action?.id !==
        "normalized-delayed-interior-characteristic-tail.v1" ||
      action?.fieldSpeed !== 1 ||
      action?.eta !== 1 / 16 ||
      action?.normalizedKineticCoefficient !== 1 ||
      action?.endpointConvention !== "infinite-characteristic-endpoint" ||
      action?.sameSupportLocalRepairAllowed !== false) {
    throw new TypeError("minimum action candidate declaration drifted.");
  }
  const chart = rawProtocol.rotatingChart;
  if (chart?.radius !== 1 ||
      chart?.angularSpeed !== 1 / 2 ||
      chart?.relativePhase !== "pi" ||
      chart?.receptionTime !== 0 ||
      chart?.solutionStatusAtDeclaration !== "prescribed-chart-only") {
    throw new TypeError("minimum rotating chart declaration drifted.");
  }
  exactArray(chart.rootPhaseBracket, [0, 1], "rootPhaseBracket");
  exactArray(
    rawProtocol.localEulerCheck?.regularizedConstraintOffsetsInEta,
    EXPECTED_OFFSETS,
    "regularizedConstraintOffsetsInEta",
  );
  exactArray(
    rawProtocol.localEulerCheck?.characteristicFiniteDifferenceSteps,
    EXPECTED_STEPS,
    "characteristicFiniteDifferenceSteps",
  );
  const euler = rawProtocol.localEulerCheck;
  if (euler?.simpsonSubdivisions !== 4096 ||
      euler?.gaussianLowerLimitInEta !== -10 ||
      euler?.absoluteDerivativeTolerance !== 5e-6 ||
      euler?.directScalarResidualFloorAwayFromCenter !== 1) {
    throw new TypeError("minimum local Euler control declaration drifted.");
  }
  const future = rawProtocol.futureBoundaryCheck;
  if (future?.timeCut !== 0 ||
      future?.futureReceptionTime !== 1 / 2 ||
      future?.alternativeContinuationCubicAmplitude !== 0.05 ||
      future?.futureIntegrandDifferenceFloor !== 1e-3 ||
      future?.sharedJetOrderAtCut !== 2 ||
      future?.causalUpdateMayReadFutureReceiver !== false ||
      rawProtocol.stopPolicy !== "stop-on-first-unresolved-gate" ||
      rawProtocol.deterministicReplayRequired !== true) {
    throw new TypeError("minimum future-boundary declaration drifted.");
  }
  return structuredClone(rawProtocol);
}

export function evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider({
  protocol: rawProtocol,
  sealedCoincidentMidpointCommonFrequencySummary,
}) {
  const protocol = validateCoincidentMidpointCommonFrequencyMinimumActionProtocol(rawProtocol);
  validateControlSummary(sealedCoincidentMidpointCommonFrequencySummary, protocol);

  const action = protocol.actionCandidate;
  const chart = protocol.rotatingChart;
  const local = protocol.localEulerCheck;
  const beta = chart.radius * chart.angularSpeed / action.fieldSpeed;
  const root = solveAntipodalPartnerRoot(beta, chart.rootPhaseBracket);
  const delay = root.phaseDelay / chart.angularSpeed;
  const radius = 2 * chart.radius * Math.cos(root.phaseDelay / 2);
  const rootResidual = radius - action.fieldSpeed * delay;
  const transmitterDenominator =
    1 + beta * Math.sin(root.phaseDelay / 2);

  const localRows = local.regularizedConstraintOffsetsInEta.map(
    (offsetInEta) => {
      const constraint = offsetInEta * action.eta;
      const expectedDerivative =
        -gaussianDelta(constraint, action.eta) / (radius * radius);
      const finiteDifferenceRows =
        local.characteristicFiniteDifferenceSteps.map((step) => {
          const plus = effectiveTailKernel({
            radius: radius + step,
            constraint: constraint - step,
            eta: action.eta,
            lowerLimitInEta: local.gaussianLowerLimitInEta,
            subdivisions: local.simpsonSubdivisions,
          });
          const minus = effectiveTailKernel({
            radius: radius - step,
            constraint: constraint + step,
            eta: action.eta,
            lowerLimitInEta: local.gaussianLowerLimitInEta,
            subdivisions: local.simpsonSubdivisions,
          });
          const observedDerivative = (plus - minus) / (2 * step);
          return {
            step,
            observedDerivative,
            expectedDerivative,
            absoluteError: Math.abs(
              observedDerivative - expectedDerivative,
            ),
          };
        });
      const directScalarResidual =
        -gaussianDeltaDerivative(constraint, action.eta) / radius;
      return {
        offsetInEta,
        constraint,
        expectedDerivative,
        finiteDifferenceRows,
        maximumAbsoluteError: Math.max(
          ...finiteDifferenceRows.map((row) => row.absoluteError),
        ),
        directScalarResidual,
        tailIdentityPassed: finiteDifferenceRows.every(
          (row) => row.absoluteError <= local.absoluteDerivativeTolerance,
        ),
        directScalarNegativeControlPassed:
          offsetInEta === 0 ||
          Math.abs(directScalarResidual) >=
            local.directScalarResidualFloorAwayFromCenter,
      };
    },
  );
  const localEulerPassed = localRows.every(
    (row) => row.tailIdentityPassed &&
      row.directScalarNegativeControlPassed,
  );

  const future = protocol.futureBoundaryCheck;
  const futureReception = future.futureReceptionTime;
  const emissionTime = futureReception - delay;
  const transmitterPosition = circularPosition(
    emissionTime,
    chart.angularSpeed,
    Math.PI,
  );
  const baselineReceiver = circularPosition(
    futureReception,
    chart.angularSpeed,
  );
  const alteredReceiver = add(
    baselineReceiver,
    [
      0,
      future.alternativeContinuationCubicAmplitude *
        futureReception ** 3,
      0,
    ],
  );
  const baselineIntegrand = futureBoundaryIntegrand({
    transmitterPosition,
    receiverPosition: baselineReceiver,
    emissionTime,
    receptionTime: futureReception,
    eta: action.eta,
  });
  const alteredIntegrand = futureBoundaryIntegrand({
    transmitterPosition,
    receiverPosition: alteredReceiver,
    emissionTime,
    receptionTime: futureReception,
    eta: action.eta,
  });
  const integrandDifference = norm(subtract(
    alteredIntegrand.vector,
    baselineIntegrand.vector,
  ));
  const futureBoundary = {
    passed: false,
    gate: "future-boundary-causal-update",
    reason:
      "normalized-tail Noether crossing terms require receiver states after " +
      "the time cut, and the current causal state has no independent wake " +
      "account that determines them",
    timeCut: future.timeCut,
    futureReception,
    emissionTime,
    sharedPresentJet: {
      order: future.sharedJetOrderAtCut,
      position: [1, 0, 0],
      velocity: [0, chart.angularSpeed, 0],
      acceleration: [-(chart.angularSpeed ** 2), 0, 0],
    },
    continuationsDifferOnlyAfterCut: true,
    baselineIntegrand,
    alteredIntegrand,
    integrandDifference,
    differenceFloor: future.futureIntegrandDifferenceFloor,
    futureDependenceWitnessPassed:
      integrandDifference >= future.futureIntegrandDifferenceFloor,
    causalUpdateMayReadFutureReceiver:
      future.causalUpdateMayReadFutureReceiver,
  };

  const resultWithoutHash = {
    schema: COINCIDENT_MIDPOINT_COMMON_FREQUENCY_MINIMUM_ACTION_RESULT_SCHEMA,
    scientificIdentity: protocol.sourceConfiguration.scientificIdentity,
    protocolId: protocol.protocolId,
    protocolHash: sha256Action(protocol),
    status: {
      code: "blocked-future-boundary-causal-update",
      score: null,
      localEulerIdentityVerifiedOnBoundedChart: localEulerPassed,
      reason:
        "the characteristic-tail local Euler identity passes on the bounded " +
        "rotating chart, but its Noether crossing charge is not determined " +
        "by the current causal state",
    },
    sealedCoincidentMidpointCommonFrequencyControl: {
      ...EXPECTED_CONTROL,
      passed: true,
      mutated: false,
    },
    actionCandidate: {
      id: action.id,
      fieldSpeed: action.fieldSpeed,
      eta: action.eta,
      endpointConvention: action.endpointConvention,
      symmetry:
        "time-translation/spatial-translation/spatial-rotation invariant " +
        "at the scalar-kernel level",
      conjugateMomentum:
        "p_i=mu_arch*V_i; mu_arch=1 only as declared diagnostic " +
        "normalization, not primitive mass",
      localEulerIdentityPassedOnBoundedChart: localEulerPassed,
    },
    rotatingChart: {
      id: chart.id,
      beta,
      phaseDelay: root.phaseDelay,
      delay,
      radius,
      rootResidual,
      transmitterDenominator,
      prescribedChartOnly: true,
      eomSolutionClaimed: false,
    },
    localEuler: {
      passed: localEulerPassed,
      rows: localRows,
      maximumAbsoluteError: Math.max(
        ...localRows.map((row) => row.maximumAbsoluteError),
      ),
      noncentralDirectScalarFailures: localRows.filter(
        (row) => row.offsetInEta !== 0 &&
          Math.abs(row.directScalarResidual) >=
            local.directScalarResidualFloorAwayFromCenter,
      ).length,
    },
    futureBoundary,
    branchAttempt: {
      executed: false,
      reason: "stop-on-first-unresolved-future-boundary",
      actualRetainedPeriodicBranchEstablished: false,
    },
    angularMomentumLedger: {
      executed: false,
      reason:
        "future-boundary gate failed before a same-record mechanical, wake, " +
        "environment, and boundary ledger could be evaluated",
      complete: false,
    },
    nonClaims: {
      quantization: false,
      physicalRealization: false,
      candidateStatus: false,
      campaign1Progress: false,
      coincidentMidpointCommonFrequencyRadiusOrHistoryExpansion: false,
    },
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256Action(resultWithoutHash),
  };
}

export function summarizeCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider(result) {
  if (result?.schema !== COINCIDENT_MIDPOINT_COMMON_FREQUENCY_MINIMUM_ACTION_RESULT_SCHEMA) {
    throw new TypeError("minimum action provider result schema mismatch.");
  }
  const summaryWithoutHash = {
    schema: COINCIDENT_MIDPOINT_COMMON_FREQUENCY_MINIMUM_ACTION_SUMMARY_SCHEMA,
    scientificIdentity: result.scientificIdentity,
    protocolId: result.protocolId,
    protocolHash: result.protocolHash,
    resultHash: result.resultHash,
    status: result.status,
    sealedCoincidentMidpointCommonFrequencyControl: result.sealedCoincidentMidpointCommonFrequencyControl,
    actionCandidate: result.actionCandidate,
    rotatingChart: result.rotatingChart,
    localEuler: {
      passed: result.localEuler.passed,
      maximumAbsoluteError: result.localEuler.maximumAbsoluteError,
      noncentralDirectScalarFailures:
        result.localEuler.noncentralDirectScalarFailures,
    },
    futureBoundary: {
      passed: result.futureBoundary.passed,
      gate: result.futureBoundary.gate,
      reason: result.futureBoundary.reason,
      timeCut: result.futureBoundary.timeCut,
      futureReception: result.futureBoundary.futureReception,
      emissionTime: result.futureBoundary.emissionTime,
      continuationsDifferOnlyAfterCut:
        result.futureBoundary.continuationsDifferOnlyAfterCut,
      integrandDifference: result.futureBoundary.integrandDifference,
      differenceFloor: result.futureBoundary.differenceFloor,
      futureDependenceWitnessPassed:
        result.futureBoundary.futureDependenceWitnessPassed,
      causalUpdateMayReadFutureReceiver:
        result.futureBoundary.causalUpdateMayReadFutureReceiver,
    },
    branchAttempt: result.branchAttempt,
    angularMomentumLedger: result.angularMomentumLedger,
    nonClaims: result.nonClaims,
  };
  return {
    ...summaryWithoutHash,
    summaryHash: sha256Action(summaryWithoutHash),
  };
}
