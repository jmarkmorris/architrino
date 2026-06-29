#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_regular_root_sampled_node_interval_certificate";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_ROOT_RADIUS = 0.00000001;
const DEFAULT_SPEED_SAMPLES = [
  SPEED_RATIO_ENCLOSURE[0],
  3.02156125,
  3.0215625,
  3.021564740248,
  3.02156625,
  3.0215675,
  3.02156875,
  SPEED_RATIO_ENCLOSURE[1],
];
const DEFAULT_Y_SAMPLES = [
  0.115,
  0.1125,
  0.11,
  0.1075,
  0.105,
  0.1,
  0.095,
  0.09,
  0.08,
  0.07,
  0.06,
  0.05,
  0.04,
  0.03,
  0.02,
  0.015,
  0.012,
  0.01,
  0.007,
  0.005,
  0.003,
  0.002,
  0.0015,
  0.001,
];

const NEXT_FLOAT_BUFFER = new ArrayBuffer(8);
const NEXT_FLOAT_VIEW = new DataView(NEXT_FLOAT_BUFFER);

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function formatInterval(interval) {
  return interval.map(formatSmallNumber);
}

function parseNumberList(value, fallback) {
  if (Array.isArray(value)) {
    return value.map(Number);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isFinite(entry));
  }
  return [...fallback];
}

function nextUp(value) {
  if (Number.isNaN(value) || value === Infinity) {
    return value;
  }
  if (value === 0) {
    return Number.MIN_VALUE;
  }
  NEXT_FLOAT_VIEW.setFloat64(0, value, false);
  let bits = NEXT_FLOAT_VIEW.getBigUint64(0, false);
  bits += value > 0 ? 1n : -1n;
  NEXT_FLOAT_VIEW.setBigUint64(0, bits, false);
  return NEXT_FLOAT_VIEW.getFloat64(0, false);
}

function nextDown(value) {
  if (Number.isNaN(value) || value === -Infinity) {
    return value;
  }
  if (value === 0) {
    return -Number.MIN_VALUE;
  }
  NEXT_FLOAT_VIEW.setFloat64(0, value, false);
  let bits = NEXT_FLOAT_VIEW.getBigUint64(0, false);
  bits += value > 0 ? -1n : 1n;
  NEXT_FLOAT_VIEW.setBigUint64(0, bits, false);
  return NEXT_FLOAT_VIEW.getFloat64(0, false);
}

function outwardInterval([left, right]) {
  return [nextDown(left), nextUp(right)];
}

function pointInterval(value) {
  return outwardInterval([value, value]);
}

function scaleInterval([left, right], scale) {
  return scale >= 0
    ? [nextDown(scale * left), nextUp(scale * right)]
    : [nextDown(scale * right), nextUp(scale * left)];
}

function addIntervals(...intervals) {
  let sumLeft = 0;
  let sumRight = 0;
  for (const [left, right] of intervals) {
    sumLeft = nextDown(sumLeft + left);
    sumRight = nextUp(sumRight + right);
  }
  return [sumLeft, sumRight];
}

function subtractIntervals(left, right) {
  return addIntervals(left, scaleInterval(right, -1));
}

function multiplyTwoIntervals([leftA, rightA], [leftB, rightB]) {
  const products = [
    leftA * leftB,
    leftA * rightB,
    rightA * leftB,
    rightA * rightB,
  ];
  return outwardInterval([Math.min(...products), Math.max(...products)]);
}

function multiplyIntervals(firstInterval, ...remainingIntervals) {
  return remainingIntervals.reduce(
    (productInterval, interval) =>
      multiplyTwoIntervals(productInterval, interval),
    firstInterval
  );
}

function reciprocalInterval([left, right]) {
  if (left <= 0 && right >= 0) {
    return [-Infinity, Infinity];
  }
  const reciprocals = [1 / left, 1 / right];
  return outwardInterval([
    Math.min(...reciprocals),
    Math.max(...reciprocals),
  ]);
}

function divideIntervals(numeratorInterval, denominatorInterval) {
  return multiplyIntervals(numeratorInterval, reciprocalInterval(denominatorInterval));
}

function positivePowerInterval(interval, exponent) {
  let product = [1, 1];
  for (let index = 0; index < exponent; index += 1) {
    product = multiplyIntervals(product, interval);
  }
  return product;
}

function intervalSignAndClearance([left, right]) {
  if (left > 0) {
    return { sign: "+", clearance: left };
  }
  if (right < 0) {
    return { sign: "-", clearance: -right };
  }
  return { sign: "mixed", clearance: 0 };
}

function containsCriticalPoint({ left, right, offset }) {
  const twoPi = 2 * Math.PI;
  if (right - left >= twoPi) {
    return true;
  }
  const minIndex = Math.ceil((left - offset) / twoPi);
  const maxIndex = Math.floor((right - offset) / twoPi);
  return minIndex <= maxIndex;
}

function sinInterval([left, right]) {
  const twoPi = 2 * Math.PI;
  if (right - left >= twoPi) {
    return [-1, 1];
  }
  let lower = Math.min(Math.sin(left), Math.sin(right));
  let upper = Math.max(Math.sin(left), Math.sin(right));
  if (containsCriticalPoint({ left, right, offset: Math.PI / 2 })) {
    upper = 1;
  }
  if (containsCriticalPoint({ left, right, offset: -Math.PI / 2 })) {
    lower = -1;
  }
  return outwardInterval([lower, upper]);
}

function cosInterval([left, right]) {
  const twoPi = 2 * Math.PI;
  if (right - left >= twoPi) {
    return [-1, 1];
  }
  let lower = Math.min(Math.cos(left), Math.cos(right));
  let upper = Math.max(Math.cos(left), Math.cos(right));
  if (containsCriticalPoint({ left, right, offset: 0 })) {
    upper = 1;
  }
  if (containsCriticalPoint({ left, right, offset: Math.PI })) {
    lower = -1;
  }
  return outwardInterval([lower, upper]);
}

function sourcePhiInterval({ thetaTildeInterval, deltaInterval }) {
  return subtractIntervals(scaleInterval(thetaTildeInterval, 2), deltaInterval);
}

function sourceEquationPoint({ speedRatio, kappa, thetaTilde, delta }) {
  return (
    (delta * delta) / (speedRatio * speedRatio) -
    2 +
    Math.sin(2 * thetaTilde - delta) +
    kappa * Math.sin(delta)
  );
}

function sourceEquationInterval({
  speedRatio,
  kappa,
  thetaTilde,
  deltaInterval,
}) {
  const speedSquared = speedRatio * speedRatio;
  const thetaTildeInterval = pointInterval(thetaTilde);
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return addIntervals(
    scaleInterval(positivePowerInterval(deltaInterval, 2), 1 / speedSquared),
    [-2, -2],
    sinInterval(phiInterval),
    scaleInterval(sinInterval(deltaInterval), kappa)
  );
}

function sourceDeltaDerivativePoint({
  speedRatio,
  kappa,
  thetaTilde,
  delta,
}) {
  return (
    (2 * delta) / (speedRatio * speedRatio) -
    Math.cos(2 * thetaTilde - delta) +
    kappa * Math.cos(delta)
  );
}

function sourceDeltaDerivativeInterval({
  speedRatio,
  kappa,
  thetaTilde,
  deltaInterval,
}) {
  const speedSquared = speedRatio * speedRatio;
  const thetaTildeInterval = pointInterval(thetaTilde);
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return addIntervals(
    scaleInterval(deltaInterval, 2 / speedSquared),
    scaleInterval(cosInterval(phiInterval), -1),
    scaleInterval(cosInterval(deltaInterval), kappa)
  );
}

function refineRootNear({
  speedRatio,
  kappa,
  thetaTilde,
  deltaGuess,
  initialWidth,
}) {
  let width = initialWidth;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const left = deltaGuess - width;
    const right = deltaGuess + width;
    const leftValue = sourceEquationPoint({
      speedRatio,
      kappa,
      thetaTilde,
      delta: left,
    });
    const rightValue = sourceEquationPoint({
      speedRatio,
      kappa,
      thetaTilde,
      delta: right,
    });
    if (leftValue === 0) {
      return left;
    }
    if (rightValue === 0) {
      return right;
    }
    if (Number.isFinite(leftValue) && Number.isFinite(rightValue) && leftValue * rightValue < 0) {
      let a = left;
      let b = right;
      let fa = leftValue;
      for (let step = 0; step < 90; step += 1) {
        const mid = 0.5 * (a + b);
        const fm = sourceEquationPoint({
          speedRatio,
          kappa,
          thetaTilde,
          delta: mid,
        });
        if (Math.abs(fm) <= 1e-15 || Math.abs(b - a) <= 1e-15) {
          return mid;
        }
        if (fa * fm <= 0) {
          b = mid;
        } else {
          a = mid;
          fa = fm;
        }
      }
      return 0.5 * (a + b);
    }
    width *= 2;
  }
  throw new Error("could not refine regular source root near sampled delta");
}

function sourceContributionValueAndDerivativeIntervals({
  speedRatio,
  kappa,
  sigma,
  thetaTilde,
  deltaInterval,
  FDeltaExpectedSign,
}) {
  const speedInterval = pointInterval(speedRatio);
  const thetaTildeInterval = pointInterval(thetaTilde);
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  const sinPhi = sinInterval(phiInterval);
  const cosPhi = cosInterval(phiInterval);
  const sinDelta = sinInterval(deltaInterval);
  const cosDelta = cosInterval(deltaInterval);
  const FDelta = sourceDeltaDerivativeInterval({
    speedRatio,
    kappa,
    thetaTilde,
    deltaInterval,
  });
  const FDeltaSign = intervalSignAndClearance(FDelta);
  const signMatches =
    FDeltaSign.sign !== "mixed" && FDeltaSign.sign === FDeltaExpectedSign;
  if (!signMatches) {
    return {
      value_interval: [-Infinity, Infinity],
      derivative_interval: [-Infinity, Infinity],
      F_delta_interval: FDelta,
      F_delta_sign: FDeltaSign.sign,
      F_delta_sign_matches_expected: false,
      minimum_F_delta_abs_clearance: 0,
    };
  }
  const signFDelta = FDeltaExpectedSign === "+" ? 1 : -1;
  const absFDelta =
    FDeltaExpectedSign === "+" ? FDelta : scaleInterval(FDelta, -1);
  const B = scaleInterval(
    addIntervals(cosPhi, scaleInterval(cosDelta, kappa)),
    -0.5
  );
  const deltaSquared = positivePowerInterval(deltaInterval, 2);
  const inverseFactor = reciprocalInterval(
    multiplyIntervals(deltaSquared, absFDelta)
  );
  const valueInterval = divideIntervals(
    scaleInterval(multiplyIntervals(B, inverseFactor), 2 * sigma),
    speedInterval
  );

  const deltaPrime = divideIntervals(scaleInterval(cosPhi, -2), FDelta);
  const BPrime = addIntervals(
    sinPhi,
    scaleInterval(
      multiplyIntervals(
        addIntervals(scaleInterval(sinDelta, kappa), scaleInterval(sinPhi, -1)),
        deltaPrime
      ),
      0.5
    )
  );
  const FDeltaDelta = addIntervals(
    [2 / (speedRatio * speedRatio), 2 / (speedRatio * speedRatio)],
    scaleInterval(sinPhi, -1),
    scaleInterval(sinDelta, -kappa)
  );
  const FDeltaPrime = addIntervals(
    scaleInterval(sinPhi, 2),
    multiplyIntervals(FDeltaDelta, deltaPrime)
  );
  const inverseFactorPrime = addIntervals(
    divideIntervals(
      scaleInterval(deltaPrime, -2),
      multiplyIntervals(
        positivePowerInterval(deltaInterval, 3),
        absFDelta
      )
    ),
    divideIntervals(
      scaleInterval(FDeltaPrime, -signFDelta),
      multiplyIntervals(
        deltaSquared,
        positivePowerInterval(absFDelta, 2)
      )
    )
  );
  const derivativeInterval = scaleInterval(
    divideIntervals(
      addIntervals(
        multiplyIntervals(BPrime, inverseFactor),
        multiplyIntervals(B, inverseFactorPrime)
      ),
      speedInterval
    ),
    2 * sigma
  );

  return {
    value_interval: valueInterval,
    derivative_interval: derivativeInterval,
    F_delta_interval: FDelta,
    F_delta_sign: FDeltaSign.sign,
    F_delta_sign_matches_expected: true,
    minimum_F_delta_abs_clearance: FDeltaSign.clearance,
  };
}

function endpointSignRow({ speedRatio, kappa, thetaTilde, delta }) {
  const equation = sourceEquationInterval({
    speedRatio,
    kappa,
    thetaTilde,
    deltaInterval: pointInterval(delta),
  });
  const sign = intervalSignAndClearance(equation);
  return {
    delta: formatSmallNumber(delta),
    F_interval: formatInterval(equation),
    F_sign: sign.sign,
    F_clearance: formatSmallNumber(sign.clearance),
  };
}

function intervalAbsUpper(interval) {
  return Math.max(Math.abs(Number(interval[0])), Math.abs(Number(interval[1])));
}

function intervalContains(interval, value) {
  return Number(interval[0]) <= value && value <= Number(interval[1]);
}

function buildRegularRootRowsForNode({
  speedRatio,
  theta,
  y,
  deltaFold,
  sampledRGRegular,
  sampledRDRegular,
  rootRadius,
  rootSubdivisions,
}) {
  const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
  const regularRootRows = [];
  const weightedValueIntervals = [];
  const weightedDerivativeIntervals = [];
  let directRegularValue = 0;
  let directRegularDerivative = 0;
  let pairToRegularSeparation = Infinity;

  for (const term of evaluation.terms) {
    const excludedRootIndices = new Set();
    if (term.term_label === "-s_{+,+}(u+Q)") {
      const rankedRoots = term.root_rows
        .map((rootRow, rootIndex) => ({
          rootIndex,
          delta: Number(rootRow.delta),
          distance: Math.abs(Number(rootRow.delta) - deltaFold),
        }))
        .sort((left, right) => left.distance - right.distance);
      for (const root of rankedRoots.slice(0, 2)) {
        excludedRootIndices.add(root.rootIndex);
      }
      const farthestPairDistance = Math.max(
        ...rankedRoots.slice(0, 2).map((root) => root.distance)
      );
      const nearestRegularDistance = Math.min(
        ...rankedRoots.slice(2).map((root) => root.distance)
      );
      pairToRegularSeparation = nearestRegularDistance - farthestPairDistance;
    }

    for (const [rootIndexText, rootRow] of term.root_rows.entries()) {
      if (excludedRootIndices.has(rootIndexText)) {
        continue;
      }
      const thetaTilde = Number(term.theta_tilde_normalized);
      const deltaGuess = Number(rootRow.delta);
      const deltaRoot = refineRootNear({
        speedRatio,
        kappa: term.kappa,
        thetaTilde,
        deltaGuess,
        initialWidth: Math.max(rootRadius * 2, 1e-13),
      });
      const deltaInterval = [deltaRoot - rootRadius, deltaRoot + rootRadius];
      const endpointRows = [
        endpointSignRow({
          speedRatio,
          kappa: term.kappa,
          thetaTilde,
          delta: deltaInterval[0],
        }),
        endpointSignRow({
          speedRatio,
          kappa: term.kappa,
          thetaTilde,
          delta: deltaInterval[1],
        }),
      ];
      const endpointSigns = endpointRows.map((endpoint) => endpoint.F_sign);
      const endpointBracketCertified =
        endpointSigns.includes("+") && endpointSigns.includes("-");
      const FDeltaPoint = sourceDeltaDerivativePoint({
        speedRatio,
        kappa: term.kappa,
        thetaTilde,
        delta: deltaRoot,
      });
      const FDeltaExpectedSign = FDeltaPoint >= 0 ? "+" : "-";
      const contribution = sourceContributionValueAndDerivativeIntervals({
        speedRatio,
        kappa: term.kappa,
        sigma: term.sigma,
        thetaTilde,
        deltaInterval,
        FDeltaExpectedSign,
      });
      const weightedValueInterval = scaleInterval(
        contribution.value_interval,
        term.coefficient
      );
      const weightedDerivativeInterval = scaleInterval(
        contribution.derivative_interval,
        term.coefficient
      );
      weightedValueIntervals.push(weightedValueInterval);
      weightedDerivativeIntervals.push(weightedDerivativeInterval);
      directRegularValue += term.coefficient * Number(rootRow.contribution);
      directRegularDerivative +=
        term.coefficient * Number(rootRow.contribution_derivative);
      regularRootRows.push({
        term_label: term.term_label,
        term_coefficient: term.coefficient,
        kappa: term.kappa,
        sigma: term.sigma,
        root_index: rootIndexText,
        theta_tilde: formatSmallNumber(thetaTilde),
        delta_center: formatSmallNumber(deltaRoot),
        delta_interval: formatInterval(deltaInterval),
        endpoint_rows: endpointRows,
        endpoint_bracket_certified: endpointBracketCertified,
        F_delta_interval: formatInterval(contribution.F_delta_interval),
        F_delta_sign: contribution.F_delta_sign,
        F_delta_sign_matches_expected:
          contribution.F_delta_sign_matches_expected,
        F_delta_clearance: formatSmallNumber(
          contribution.minimum_F_delta_abs_clearance
        ),
        value_interval: formatInterval(contribution.value_interval),
        derivative_interval: formatInterval(contribution.derivative_interval),
        weighted_value_interval: formatInterval(weightedValueInterval),
        weighted_derivative_interval: formatInterval(weightedDerivativeInterval),
      });
    }
  }

  const regularValueInterval = addIntervals(...weightedValueIntervals);
  const regularDerivativeInterval = addIntervals(...weightedDerivativeIntervals);
  const RGRegularOverYInterval = scaleInterval(regularValueInterval, 2);
  const RDRegularOverY3Interval = scaleInterval(regularDerivativeInterval, 4);
  const directRGRegularOverY = 2 * directRegularValue;
  const directRDRegularOverY3 = 4 * directRegularDerivative;
  const predecessorRGRegularOverY = sampledRGRegular / y;
  const predecessorRDRegularOverY3 = sampledRDRegular / y ** 3;
  return {
    speed_ratio: formatSmallNumber(speedRatio),
    y: formatSmallNumber(y),
    theta: formatSmallNumber(theta),
    delta_fold: formatSmallNumber(deltaFold),
    root_radius: formatSmallNumber(rootRadius),
    term_root_count_signature: evaluation.terms
      .map((term) => term.root_count)
      .join(","),
    regular_root_count: regularRootRows.length,
    pair_to_regular_root_separation_margin: formatSmallNumber(
      pairToRegularSeparation
    ),
    regular_root_interval_rows: regularRootRows,
    all_root_brackets_certified: regularRootRows.every(
      (root) => root.endpoint_bracket_certified
    ),
    all_F_delta_signs_certified: regularRootRows.every(
      (root) => root.F_delta_sign_matches_expected
    ),
    R_G_regular_over_y_interval: formatInterval(RGRegularOverYInterval),
    R_D_regular_over_y3_interval: formatInterval(RDRegularOverY3Interval),
    direct_R_G_regular_over_y: formatSmallNumber(directRGRegularOverY),
    direct_R_D_regular_over_y3: formatSmallNumber(directRDRegularOverY3),
    predecessor_R_G_regular_over_y: formatSmallNumber(
      predecessorRGRegularOverY
    ),
    predecessor_R_D_regular_over_y3: formatSmallNumber(
      predecessorRDRegularOverY3
    ),
    predecessor_vs_direct_R_G_regular_over_y_abs: formatSmallNumber(
      Math.abs(predecessorRGRegularOverY - directRGRegularOverY)
    ),
    predecessor_vs_direct_R_D_regular_over_y3_abs: formatSmallNumber(
      Math.abs(predecessorRDRegularOverY3 - directRDRegularOverY3)
    ),
    direct_R_G_regular_over_y_contained: intervalContains(
      RGRegularOverYInterval,
      directRGRegularOverY
    ),
    direct_R_D_regular_over_y3_contained: intervalContains(
      RDRegularOverY3Interval,
      directRDRegularOverY3
    ),
  };
}

function summarizeRows(rows, certifiedBudget) {
  const rootRows = rows.flatMap((row) => row.regular_root_interval_rows);
  const endpointRows = rootRows.flatMap((root) => root.endpoint_rows);
  const allRootBracketsCertified = rows.every(
    (row) => row.all_root_brackets_certified
  );
  const allFDeltaSignsCertified = rows.every(
    (row) => row.all_F_delta_signs_certified
  );
  const allDirectQuotientsContained = rows.every(
    (row) =>
      row.direct_R_G_regular_over_y_contained &&
      row.direct_R_D_regular_over_y3_contained
  );
  const minEndpointFClearance = Math.min(
    ...endpointRows.map((endpoint) => Number(endpoint.F_clearance))
  );
  const minFDeltaClearance = Math.min(
    ...rootRows.map((root) => Number(root.F_delta_clearance))
  );
  const minPairToRegularSeparation = Math.min(
    ...rows.map((row) => Number(row.pair_to_regular_root_separation_margin))
  );
  const maxRGRegularOverYIntervalAbsUpper = Math.max(
    ...rows.map((row) => intervalAbsUpper(row.R_G_regular_over_y_interval))
  );
  const maxRDRegularOverY3IntervalAbsUpper = Math.max(
    ...rows.map((row) => intervalAbsUpper(row.R_D_regular_over_y3_interval))
  );
  const maxPredecessorVsDirectRDDrift = Math.max(
    ...rows.map((row) =>
      Number(row.predecessor_vs_direct_R_D_regular_over_y3_abs)
    )
  );
  const outerRadius = Math.max(...rows.map((row) => Number(row.y)));
  const impliedRGRegularBudget = maxRGRegularOverYIntervalAbsUpper * outerRadius;
  const impliedRDRegularBudget =
    maxRDRegularOverY3IntervalAbsUpper * outerRadius ** 3;
  const passed =
    allRootBracketsCertified &&
    allFDeltaSignsCertified &&
    allDirectQuotientsContained &&
    minEndpointFClearance > 1e-10 &&
    minFDeltaClearance > 0.5 &&
    minPairToRegularSeparation > 1.6 &&
    maxRGRegularOverYIntervalAbsUpper < 0.11 &&
    maxRDRegularOverY3IntervalAbsUpper < 0.75 &&
    impliedRGRegularBudget < certifiedBudget &&
    impliedRDRegularBudget < certifiedBudget;
  return {
    sample_node_count: rows.length,
    regular_root_interval_count: rootRows.length,
    endpoint_interval_count: endpointRows.length,
    all_root_brackets_certified: allRootBracketsCertified,
    all_F_delta_signs_certified: allFDeltaSignsCertified,
    all_direct_regular_quotients_contained: allDirectQuotientsContained,
    min_endpoint_F_clearance: formatSmallNumber(minEndpointFClearance),
    min_F_delta_clearance: formatSmallNumber(minFDeltaClearance),
    min_pair_to_regular_root_separation: formatSmallNumber(
      minPairToRegularSeparation
    ),
    certified_budget_from_negative_L_upper: formatSmallNumber(certifiedBudget),
    max_abs_R_G_regular_over_y_interval_upper: formatSmallNumber(
      maxRGRegularOverYIntervalAbsUpper
    ),
    max_abs_R_D_regular_over_y3_interval_upper: formatSmallNumber(
      maxRDRegularOverY3IntervalAbsUpper
    ),
    max_predecessor_vs_direct_R_D_regular_over_y3_abs: formatSmallNumber(
      maxPredecessorVsDirectRDDrift
    ),
    implied_R_G_regular_budget_at_outer_radius: formatSmallNumber(
      impliedRGRegularBudget
    ),
    implied_R_D_regular_budget_at_outer_radius: formatSmallNumber(
      impliedRDRegularBudget
    ),
    max_regular_root_budget_ratio: formatSmallNumber(
      Math.max(impliedRGRegularBudget, impliedRDRegularBudget) / certifiedBudget
    ),
    status: passed
      ? "directed-rounded-sampled-node-theta3minus-regular-root-interval-certified"
      : "directed-rounded-sampled-node-theta3minus-regular-root-interval-open",
  };
}

function validateSpeedSamples(speedSamples) {
  if (
    !Array.isArray(speedSamples) ||
    speedSamples.length < 5 ||
    speedSamples.some(
      (entry) =>
        !Number.isFinite(entry) ||
        entry < SPEED_RATIO_ENCLOSURE[0] ||
        entry > SPEED_RATIO_ENCLOSURE[1]
    )
  ) {
    throw new Error(
      "speedSamples must contain at least five finite values inside the certified speed-ratio enclosure"
    );
  }
  if (
    !speedSamples.some(
      (entry) => Math.abs(entry - SPEED_RATIO_ENCLOSURE[0]) <= 1e-14
    ) ||
    !speedSamples.some(
      (entry) => Math.abs(entry - SPEED_RATIO_ENCLOSURE[1]) <= 1e-14
    )
  ) {
    throw new Error("speedSamples must include both speed enclosure endpoints");
  }
}

function validateYSamples(ySamples) {
  if (
    !Array.isArray(ySamples) ||
    ySamples.length < 8 ||
    ySamples.some((entry) => !Number.isFinite(entry) || entry <= 0)
  ) {
    throw new Error("ySamples must contain at least eight positive finite values");
  }
  for (let index = 1; index < ySamples.length; index += 1) {
    if (ySamples[index] >= ySamples[index - 1]) {
      throw new Error("ySamples must be strictly decreasing");
    }
  }
  if (ySamples[0] < 0.115 || ySamples[ySamples.length - 1] > 0.001) {
    throw new Error("ySamples must include y=0.115 and reach y<=0.001");
  }
}

function buildFoldRowMap(normalFormArtifact) {
  return new Map(
    normalFormArtifact.speed_dependent_fold_normal_form_rows.map((row) => [
      Number(row.speed_ratio).toPrecision(15),
      row,
    ])
  );
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate(
  options = {}
) {
  const rootRadius = Number(options.rootRadius ?? DEFAULT_ROOT_RADIUS);
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const speedSamples = parseNumberList(
    options.speedSamples,
    DEFAULT_SPEED_SAMPLES
  );
  const ySamples = parseNumberList(options.ySamples, DEFAULT_Y_SAMPLES);
  if (!Number.isFinite(rootRadius) || rootRadius <= 0 || rootRadius > 0.0001) {
    throw new Error("rootRadius must be finite, positive, and <= 0.0001");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  validateSpeedSamples(speedSamples);
  validateYSamples(ySamples);

  const predecessor =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate({
      rootSubdivisions,
      speedSamples,
      ySamples,
    });
  const normalFormArtifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      rootSubdivisions,
      speedSamples,
      ySamples,
    });
  const remainderPacket =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan({
      rootSubdivisions,
      speedSamples,
      ySamples,
    });
  const foldRows = buildFoldRowMap(normalFormArtifact);
  const certifiedBudget = Number(
    remainderPacket.sampled_remainder_budget_summary
      .certified_budget_from_negative_L_upper
  );
  const rows = remainderPacket.sampled_remainder_budget_rows.flatMap(
    (speedRow) =>
      speedRow.sample_rows.map((sample) => {
        const speedRatio = Number(sample.speed_ratio);
        const foldRow = foldRows.get(speedRatio.toPrecision(15));
        if (!foldRow) {
          throw new Error(`missing fold row for speed ratio ${speedRatio}`);
        }
        const y = Number(sample.y);
        return buildRegularRootRowsForNode({
          speedRatio,
          theta: Number(speedRow.theta_fold) - y * y,
          y,
          deltaFold: Number(foldRow.delta_fold),
          sampledRGRegular: Number(sample.R_G_regular),
          sampledRDRegular: Number(sample.R_D_regular),
          rootRadius,
          rootSubdivisions,
        });
      })
  );
  const summary = summarizeRows(rows, certifiedBudget);
  const passed =
    summary.status ===
    "directed-rounded-sampled-node-theta3minus-regular-root-interval-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.md",
    interval_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      speed_samples: speedSamples.map(formatSmallNumber),
      y_samples: ySamples.map(formatSmallNumber),
      root_radius: formatSmallNumber(rootRadius),
      root_subdivisions: rootSubdivisions,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      sampled_node_scope:
        "directed-rounded arithmetic at the finite speed/y regular-root stencil nodes emitted by the predecessor; not a continuous speed/y cell cover",
      reserved_cluster:
        "the two roots nearest delta_f(nu) in -s_{+,+}(u+Q) are excluded and left to the fold-pair scaled chart",
    },
    sampled_node_regular_root_interval_rows: rows,
    sampled_node_regular_root_interval_summary: summary,
    imported_strict_stencil_summary:
      predecessor.strict_remainder_budget_summary,
    closure_burndown: [
      {
        row: "theta3minus.sampled-regular-root-stencil",
        status: "sampled-stencil-certified",
      },
      {
        row: "theta3minus.sampled-node-regular-root-brackets",
        status: passed ? "directed-rounded-certified" : "open",
      },
      {
        row: "theta3minus.sampled-node-regular-root-GD-quotient-enclosures",
        status: passed ? "directed-rounded-certified" : "open",
      },
      {
        row: "theta3minus.regular-root-remainder-continuous-collar",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "directed-rounded-open",
      },
      {
        row: "I1.regular-critical-exhaustion",
        status: "blocked-by-theta3minus-remainder",
      },
    ],
    artifact_claim: {
      receiver_normal_eom_evidence_status: "invalidated-by-receiver-normal-master-eom",
      receiver_normal_restart_required: true,
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_sampled_node_regular_root_brackets: passed,
      certifies_directed_rounded_sampled_node_regular_root_GD_quotient_enclosures:
        passed,
      certifies_directed_rounded_regular_root_remainder: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded sampled-node interval certificate for the regular-root source brackets and regular G,D quotient enclosures. Continuous regular-root remainder, fold-pair remainder, full collar closure, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.regular-root-remainder-continuous-collar-directed-rounded-required",
      parallel_successor_row:
        "theta3minus.fold-pair-scaled-remainder-continuous-collar-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The regular roots are now interval-bracketed with directed-rounded arithmetic at every strict speed/y stencil node, with fixed-sign F_delta intervals and enclosed regular G,D quotient rows. The remaining regular-root burden is continuous speed/y cell intervalization.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus regular-root sampled-node interval certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus regular-root sampled-node interval certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.interval_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "regular-root sampled-node interval certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.interval_parameters?.speed_band === undefined &&
      artifact?.interval_parameters?.speed_window === undefined &&
      artifact?.interval_parameters?.speed_min === undefined &&
      artifact?.interval_parameters?.speed_max === undefined,
    "interval parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.sampled_node_regular_root_interval_summary?.status ===
      "directed-rounded-sampled-node-theta3minus-regular-root-interval-certified" &&
      artifact?.sampled_node_regular_root_interval_summary
        ?.all_root_brackets_certified === true &&
      artifact?.sampled_node_regular_root_interval_summary
        ?.all_F_delta_signs_certified === true &&
      artifact?.sampled_node_regular_root_interval_summary
        ?.all_direct_regular_quotients_contained === true &&
      Number(
        artifact?.sampled_node_regular_root_interval_summary
          ?.min_endpoint_F_clearance
      ) > 1e-10 &&
      Number(
        artifact?.sampled_node_regular_root_interval_summary
          ?.min_F_delta_clearance
      ) > 0.5 &&
      Number(
        artifact?.sampled_node_regular_root_interval_summary
          ?.max_abs_R_G_regular_over_y_interval_upper
      ) < 0.11 &&
      Number(
        artifact?.sampled_node_regular_root_interval_summary
          ?.max_abs_R_D_regular_over_y3_interval_upper
      ) < 0.75,
    "sampled-node regular-root interval rows must certify root brackets, F_delta signs, direct quotient containment, and G/D quotient enclosures",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_sampled_node_regular_root_brackets === true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_sampled_node_regular_root_GD_quotient_enclosures ===
        true &&
      artifact?.artifact_claim?.certifies_directed_rounded_regular_root_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must keep continuous regular-root remainder, I1 closure, and retention open",
    errors
  );
  return errors;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--schema") {
      options.schema = true;
    } else if (arg === "--root-radius") {
      options.rootRadius = argv[++index];
    } else if (arg === "--root-subdivisions") {
      options.rootSubdivisions = argv[++index];
    } else if (arg === "--speed-samples") {
      options.speedSamples = argv[++index];
    } else if (arg === "--y-samples") {
      options.ySamples = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                  Write artifact JSON",
    "  --validate <path>             Validate an artifact JSON",
    "  --schema                      Print artifact schema metadata",
    "  --root-radius <value>         Symmetric delta interval radius around sampled regular roots",
    "  --root-subdivisions <count>   Root subdivisions for point evaluator",
    "  --speed-samples <csv>         Speed samples inside [3.02156,3.02157]",
    "  --y-samples <csv>             Strictly decreasing positive y samples",
  ].join("\n");
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  if (options.schema) {
    console.log(
      JSON.stringify(
        {
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA,
          packet_id: PACKET_ID,
          promotion_status: PROMOTION_STATUS,
        },
        null,
        2
      )
    );
    return;
  }

  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate(
        options
      );
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate(
        artifact
      );
    if (errors.length > 0) {
      console.error(JSON.stringify({ valid: false, errors }, null, 2));
      process.exitCode = 1;
      return;
    }
    const json = JSON.stringify(artifact, null, 2);
    if (options.out) {
      fs.mkdirSync(path.dirname(options.out), { recursive: true });
      fs.writeFileSync(options.out, `${json}\n`);
    } else {
      console.log(json);
    }
  } catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
