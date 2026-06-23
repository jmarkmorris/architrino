#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPACT_COMPLEMENT_DIRECTED_ROUNDED_INTERVAL_ENCLOSURE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_compact_complement_directed_rounded_interval_enclosure";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_INITIAL_THETA_CELL_COUNT_LEFT = 4;
const DEFAULT_INITIAL_THETA_CELL_COUNT_RIGHT = 24;
const DEFAULT_MAX_ADAPTIVE_DEPTH = 9;
const DEFAULT_SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS = 32;
const DEFAULT_SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS = 192;
const DEFAULT_FOLD_COLLAR_ATTACHMENT_Y = 0.115;
const DEFAULT_FOLD_COLLAR_FINITE_Y_MIN = 0.003;
const DEFAULT_INITIAL_FOLD_COLLAR_Y_CELL_COUNT = 4;
const DEFAULT_FOLD_COLLAR_MAX_ADAPTIVE_DEPTH = 0;
const DEFAULT_FOLD_COLLAR_SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS = 8;
const DEFAULT_FOLD_COLLAR_SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS = 32;
const SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS = 30;
const SOURCE_ROOT_DOMAIN_MIN = 1e-9;
const SOURCE_ROOT_DOMAIN_RELATIVE_PADDING = 1e-8;
const TWO_PI = 2 * Math.PI;
const QUARTER_PERIOD = Math.PI / 2;
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const EXPECTED_SOURCE_ROOT_COUNT = 6;
const EXPECTED_TERM_SIGNATURE = "1,3,1,1";
const I1_CELL_LEFT_ENDPOINT = 0;
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;
const THETA_3_MINUS = 0.997370655243;
const THETA_3_MINUS_SPEED_ENCLOSURE = [0.997362865339, 0.997377676237];
const RESULT_THEORY_STATUS =
  "source-atlas-aware-i1-compact-complement-directed-rounded-interval-enclosures-certified";
const SUCCESSOR_ROW =
  "theta_3minus.left-fold-collar-speed-dependent-normal-form-required";
const PARAMETER_SAMPLE_COORDINATES = [0, 0.5, 1];

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

function signLabel(value) {
  if (value > 0) {
    return "+";
  }
  if (value < 0) {
    return "-";
  }
  return "0";
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

function uniqueSortedStrings(values) {
  return [...new Set(values)].sort();
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

function offsetInterval([left, right], offset) {
  return [nextDown(left + offset), nextUp(right + offset)];
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
    (productInterval, interval) => multiplyTwoIntervals(productInterval, interval),
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

function hullIntervals(...intervals) {
  return outwardInterval([
    Math.min(...intervals.map((interval) => interval[0])),
    Math.max(...intervals.map((interval) => interval[1])),
  ]);
}

function negateInterval([left, right]) {
  return [-right, -left];
}

function positivePowerInterval(interval, exponent) {
  let product = [1, 1];
  for (let index = 0; index < exponent; index += 1) {
    product = multiplyIntervals(product, interval);
  }
  return product;
}

function intervalWidth([left, right]) {
  return right - left;
}

function interpolateInterval([left, right], coordinate) {
  return left + (right - left) * coordinate;
}

function subintervalForIndex({ interval, index, count }) {
  return [
    interpolateInterval(interval, index / count),
    interpolateInterval(interval, (index + 1) / count),
  ];
}

function containsCriticalPoint({ left, right, offset }) {
  if (right - left >= TWO_PI) {
    return true;
  }
  const minIndex = Math.ceil((left - offset) / TWO_PI);
  const maxIndex = Math.floor((right - offset) / TWO_PI);
  return minIndex <= maxIndex;
}

function sinInterval([left, right]) {
  if (right - left >= TWO_PI) {
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
  if (right - left >= TWO_PI) {
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
  return [
    nextDown(2 * thetaTildeInterval[0] - deltaInterval[1]),
    nextUp(2 * thetaTildeInterval[1] - deltaInterval[0]),
  ];
}

function deltaSquaredOverSpeedSquaredInterval({
  deltaInterval,
  speedRatioInterval,
}) {
  return [
    nextDown(
      (deltaInterval[0] * deltaInterval[0]) /
        (speedRatioInterval[1] * speedRatioInterval[1])
    ),
    nextUp(
      (deltaInterval[1] * deltaInterval[1]) /
        (speedRatioInterval[0] * speedRatioInterval[0])
    ),
  ];
}

function twoDeltaOverSpeedSquaredInterval({
  deltaInterval,
  speedRatioInterval,
}) {
  return [
    nextDown(
      (2 * deltaInterval[0]) /
        (speedRatioInterval[1] * speedRatioInterval[1])
    ),
    nextUp(
      (2 * deltaInterval[1]) /
        (speedRatioInterval[0] * speedRatioInterval[0])
    ),
  ];
}

function twoOverSpeedSquaredInterval(speedRatioInterval) {
  return [
    nextDown(2 / (speedRatioInterval[1] * speedRatioInterval[1])),
    nextUp(2 / (speedRatioInterval[0] * speedRatioInterval[0])),
  ];
}

function sourceRootEquation({ speedRatio, kappa, thetaTilde, delta }) {
  const phi = 2 * thetaTilde - delta;
  return (
    (delta * delta) / (speedRatio * speedRatio) -
    2 +
    Math.sin(phi) +
    kappa * Math.sin(delta)
  );
}

function sourceRootDeltaDerivative({ speedRatio, kappa, thetaTilde, delta }) {
  const phi = 2 * thetaTilde - delta;
  return (
    (2 * delta) / (speedRatio * speedRatio) -
    Math.cos(phi) +
    kappa * Math.cos(delta)
  );
}

function sourceRootEquationInterval({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  deltaInterval,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return addIntervals(
    deltaSquaredOverSpeedSquaredInterval({
      deltaInterval,
      speedRatioInterval,
    }),
    [-2, -2],
    sinInterval(phiInterval),
    scaleInterval(sinInterval(deltaInterval), kappa)
  );
}

function sourceRootDeltaDerivativeInterval({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  deltaInterval,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return addIntervals(
    twoDeltaOverSpeedSquaredInterval({
      deltaInterval,
      speedRatioInterval,
    }),
    negateInterval(cosInterval(phiInterval)),
    scaleInterval(cosInterval(deltaInterval), kappa)
  );
}

function sourceContributionValueInterval({
  speedRatioInterval,
  kappa,
  sigma,
  thetaTildeInterval,
  deltaInterval,
  FDeltaExpectedSign,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  const FDeltaInterval = sourceRootDeltaDerivativeInterval({
    speedRatioInterval,
    kappa,
    thetaTildeInterval,
    deltaInterval,
  });
  const FDeltaSignInfo = intervalSignAndClearance(FDeltaInterval);
  const FDeltaSignMatches =
    FDeltaSignInfo.sign !== "mixed" && FDeltaSignInfo.sign === FDeltaExpectedSign;
  if (!FDeltaSignMatches || FDeltaSignInfo.clearance <= 0) {
    return {
      value_interval: [-Infinity, Infinity],
      F_delta_interval: FDeltaInterval,
      F_delta_sign: FDeltaSignInfo.sign,
      F_delta_sign_matches_expected: false,
      minimum_F_delta_abs_clearance: 0,
    };
  }
  const absFDeltaInterval =
    FDeltaExpectedSign === "-"
      ? negateInterval(FDeltaInterval)
      : FDeltaInterval;
  const kernelInterval = scaleInterval(
    addIntervals(cosInterval(phiInterval), scaleInterval(cosInterval(deltaInterval), kappa)),
    -0.5
  );
  const inverseFactorInterval = reciprocalInterval(
    multiplyIntervals(
      positivePowerInterval(deltaInterval, 2),
      absFDeltaInterval
    )
  );
  const valueInterval = divideIntervals(
    scaleInterval(
      multiplyIntervals(kernelInterval, inverseFactorInterval),
      2 * sigma
    ),
    speedRatioInterval
  );
  return {
    value_interval: valueInterval,
    F_delta_interval: FDeltaInterval,
    F_delta_sign: FDeltaSignInfo.sign,
    F_delta_sign_matches_expected: true,
    minimum_F_delta_abs_clearance: FDeltaSignInfo.clearance,
  };
}

function sourceContributionValueAndDerivativeInterval({
  speedRatioInterval,
  kappa,
  sigma,
  thetaTildeInterval,
  deltaInterval,
  FDeltaExpectedSign,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  const sinPhiInterval = sinInterval(phiInterval);
  const cosPhiInterval = cosInterval(phiInterval);
  const sinDeltaInterval = sinInterval(deltaInterval);
  const cosDeltaInterval = cosInterval(deltaInterval);
  const FDeltaInterval = sourceRootDeltaDerivativeInterval({
    speedRatioInterval,
    kappa,
    thetaTildeInterval,
    deltaInterval,
  });
  const FDeltaSignInfo = intervalSignAndClearance(FDeltaInterval);
  const FDeltaSignMatches =
    FDeltaSignInfo.sign !== "mixed" && FDeltaSignInfo.sign === FDeltaExpectedSign;
  if (!FDeltaSignMatches || FDeltaSignInfo.clearance <= 0) {
    return {
      value_interval: [-Infinity, Infinity],
      derivative_interval: [-Infinity, Infinity],
      F_delta_interval: FDeltaInterval,
      F_delta_sign: FDeltaSignInfo.sign,
      F_delta_sign_matches_expected: false,
      minimum_F_delta_abs_clearance: 0,
    };
  }
  const absFDeltaInterval =
    FDeltaExpectedSign === "-"
      ? negateInterval(FDeltaInterval)
      : FDeltaInterval;
  const kernelInterval = scaleInterval(
    addIntervals(cosPhiInterval, scaleInterval(cosDeltaInterval, kappa)),
    -0.5
  );
  const inverseFactorInterval = reciprocalInterval(
    multiplyIntervals(
      positivePowerInterval(deltaInterval, 2),
      absFDeltaInterval
    )
  );
  const valueInterval = divideIntervals(
    scaleInterval(
      multiplyIntervals(kernelInterval, inverseFactorInterval),
      2 * sigma
    ),
    speedRatioInterval
  );
  const deltaPrimeInterval = divideIntervals(
    scaleInterval(cosPhiInterval, -2),
    FDeltaInterval
  );
  const BPrimeInterval = addIntervals(
    sinPhiInterval,
    scaleInterval(
      multiplyIntervals(
        addIntervals(scaleInterval(sinDeltaInterval, kappa), negateInterval(sinPhiInterval)),
        deltaPrimeInterval
      ),
      0.5
    )
  );
  const FDeltaDeltaInterval = addIntervals(
    twoOverSpeedSquaredInterval(speedRatioInterval),
    negateInterval(sinPhiInterval),
    scaleInterval(sinDeltaInterval, -kappa)
  );
  const FDeltaPrimeInterval = addIntervals(
    scaleInterval(sinPhiInterval, 2),
    multiplyIntervals(FDeltaDeltaInterval, deltaPrimeInterval)
  );
  const inverseFactorPrimeInterval = addIntervals(
    divideIntervals(
      scaleInterval(deltaPrimeInterval, -2),
      multiplyIntervals(positivePowerInterval(deltaInterval, 3), absFDeltaInterval)
    ),
    divideIntervals(
      scaleInterval(FDeltaPrimeInterval, FDeltaExpectedSign === "-" ? 1 : -1),
      multiplyIntervals(
        positivePowerInterval(deltaInterval, 2),
        positivePowerInterval(absFDeltaInterval, 2)
      )
    )
  );
  const derivativeInterval = divideIntervals(
    scaleInterval(
      addIntervals(
        multiplyIntervals(BPrimeInterval, inverseFactorInterval),
        multiplyIntervals(kernelInterval, inverseFactorPrimeInterval)
      ),
      2 * sigma
    ),
    speedRatioInterval
  );
  return {
    value_interval: valueInterval,
    derivative_interval: derivativeInterval,
    F_delta_interval: FDeltaInterval,
    F_delta_sign: FDeltaSignInfo.sign,
    F_delta_sign_matches_expected: true,
    minimum_F_delta_abs_clearance: FDeltaSignInfo.clearance,
  };
}

function sourceThetaTildeIntervalForTerm({ thetaInterval, termLabel }) {
  return termLabel.includes("u+Q")
    ? offsetInterval(thetaInterval, QUARTER_PERIOD)
    : thetaInterval;
}

function sourceThetaTildeForTerm({ theta, termLabel }) {
  return termLabel.includes("u+Q") ? theta + QUARTER_PERIOD : theta;
}

function sourceRootDomainMax(speedRatio) {
  return (
    2 * speedRatio +
    SOURCE_ROOT_DOMAIN_RELATIVE_PADDING * Math.max(1, speedRatio)
  );
}

function crossBinaryCoefficientForTerm(termLabel) {
  return termLabel.startsWith("-") ? -1 : 1;
}

function buildParameterSamples({ thetaInterval, speedRatioInterval }) {
  return PARAMETER_SAMPLE_COORDINATES.flatMap((thetaCoordinate) =>
    PARAMETER_SAMPLE_COORDINATES.map((speedCoordinate) => ({
      theta: interpolateInterval(thetaInterval, thetaCoordinate),
      speed_ratio: interpolateInterval(speedRatioInterval, speedCoordinate),
    }))
  );
}

function buildTileSampleRows({
  thetaInterval,
  speedRatioInterval,
  rootSubdivisions,
}) {
  return buildParameterSamples({ thetaInterval, speedRatioInterval }).map(
    (parameter) => {
      const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
        speedRatio: parameter.speed_ratio,
        theta: parameter.theta,
        rootSubdivisions,
      });
      return {
        theta: parameter.theta,
        speed_ratio: parameter.speed_ratio,
        forcing: evaluation.value,
        forcing_sign: signLabel(evaluation.value),
        source_root_count: evaluation.source_root_count,
        term_root_count_signature: evaluation.terms.map((term) => term.root_count),
        root_sheets: evaluation.terms.map((term) => ({
          term_label: term.term_label,
          kappa: term.kappa,
          sigma: term.sigma,
          coefficient: term.coefficient,
          root_count: term.root_count,
          roots: term.root_rows.map((rootRow) => ({
            delta: Number(rootRow.delta),
            F_delta: Number(rootRow.F_delta),
            F_delta_sign: signLabel(Number(rootRow.F_delta)),
          })),
        })),
      };
    }
  );
}

function buildSampledRootTubeRegularityProbe(sampleRows) {
  const rootCountSignatures = uniqueSortedStrings(
    sampleRows.map((row) => row.term_root_count_signature.join(","))
  );
  const firstSheets = sampleRows[0]?.root_sheets ?? [];
  let minAbsFDelta = Infinity;
  let minPositiveDelta = Infinity;
  let minTubeSeparation = Infinity;
  let maxBranchDeltaWidth = 0;
  let allFDeltaSignsPreserved = true;
  const termRows = firstSheets.map((firstTerm, termIndex) => {
    const termSamples = sampleRows.map((row) => row.root_sheets[termIndex]);
    const rootCountSet = uniqueSortedStrings(
      termSamples.map((term) => String(term.root_count))
    );
    const branchRows = [];
    for (let rootIndex = 0; rootIndex < firstTerm.root_count; rootIndex += 1) {
      const rootSamples = termSamples.map((term) => term.roots[rootIndex]);
      if (rootSamples.some((root) => root === undefined)) {
        allFDeltaSignsPreserved = false;
        continue;
      }
      const deltas = rootSamples.map((root) => root.delta);
      const fDeltas = rootSamples.map((root) => root.F_delta);
      const fDeltaSigns = uniqueSortedStrings(
        rootSamples.map((root) => root.F_delta_sign)
      );
      const deltaMin = Math.min(...deltas);
      const deltaMax = Math.max(...deltas);
      const branchDeltaWidth = deltaMax - deltaMin;
      const branchMinAbsFDelta = Math.min(
        ...fDeltas.map((value) => Math.abs(value))
      );
      allFDeltaSignsPreserved =
        allFDeltaSignsPreserved && fDeltaSigns.length === 1;
      minAbsFDelta = Math.min(minAbsFDelta, branchMinAbsFDelta);
      minPositiveDelta = Math.min(minPositiveDelta, ...deltas);
      maxBranchDeltaWidth = Math.max(maxBranchDeltaWidth, branchDeltaWidth);
      branchRows.push({
        root_index: rootIndex,
        delta_min: deltaMin,
        delta_max: deltaMax,
        delta_sample_width: branchDeltaWidth,
        F_delta_signs: fDeltaSigns,
        F_delta_sign_preserved: fDeltaSigns.length === 1,
        min_abs_F_delta: branchMinAbsFDelta,
        min_positive_delta: Math.min(...deltas),
      });
    }
    const adjacentSeparations = [];
    for (let index = 0; index < branchRows.length - 1; index += 1) {
      adjacentSeparations.push(
        branchRows[index + 1].delta_min - branchRows[index].delta_max
      );
    }
    const finiteSeparations = adjacentSeparations.filter(Number.isFinite);
    const termMinTubeSeparation =
      finiteSeparations.length === 0 ? null : Math.min(...finiteSeparations);
    if (termMinTubeSeparation !== null) {
      minTubeSeparation = Math.min(minTubeSeparation, termMinTubeSeparation);
    }
    return {
      term_label: firstTerm.term_label,
      kappa: firstTerm.kappa,
      sigma: firstTerm.sigma,
      coefficient: firstTerm.coefficient,
      root_counts: rootCountSet.map(Number),
      root_count_preserved: rootCountSet.length === 1,
      F_delta_sign_signature: branchRows
        .map((branch) => branch.F_delta_signs.join(""))
        .join(","),
      min_sampled_root_tube_separation: termMinTubeSeparation,
      branches: branchRows,
    };
  });
  const minSeparation =
    minTubeSeparation === Infinity ? null : minTubeSeparation;
  const rootCountSignaturePreserved =
    rootCountSignatures.length === 1 &&
    rootCountSignatures[0] === EXPECTED_TERM_SIGNATURE;
  const sampledTubeRegularityPassed =
    rootCountSignaturePreserved &&
    allFDeltaSignsPreserved &&
    minAbsFDelta > 0 &&
    minPositiveDelta > 0 &&
    (minSeparation === null || minSeparation > 0);
  return {
    root_count_signatures: rootCountSignatures,
    root_count_signature_preserved: rootCountSignaturePreserved,
    all_F_delta_signs_preserved: allFDeltaSignsPreserved,
    minimum_sampled_abs_F_delta: minAbsFDelta,
    minimum_sampled_positive_delta: minPositiveDelta,
    minimum_sampled_root_tube_separation: minSeparation,
    maximum_sampled_branch_delta_width: maxBranchDeltaWidth,
    term_root_tube_rows: termRows,
    status: sampledTubeRegularityPassed
      ? "sampled-root-tube-regularity-feasibility-passed"
      : "sampled-root-tube-regularity-feasibility-open",
  };
}

function buildFiniteIntervalRootTubeCertificateTarget({
  sampledRootTubeRegularityProbe,
  speedRatioInterval,
}) {
  const deltaDomain = [
    SOURCE_ROOT_DOMAIN_MIN,
    sourceRootDomainMax(Number(speedRatioInterval[1])),
  ];
  let minimumTubePaddingRadius = Infinity;
  let minimumComplementSlabWidth = Infinity;
  let retainedTubeCount = 0;
  let complementSlabCount = 0;
  const termTargetRows =
    sampledRootTubeRegularityProbe.term_root_tube_rows.map((termRow) => {
      const sampledBranches = termRow.branches.map((branch) => ({
        root_index: branch.root_index,
        delta_min: Number(branch.delta_min),
        delta_max: Number(branch.delta_max),
        F_delta_sign:
          branch.F_delta_signs.length === 1 ? branch.F_delta_signs[0] : "mixed",
        min_abs_F_delta: Number(branch.min_abs_F_delta),
      }));
      const protectedTubes = sampledBranches.map((branch, index) => {
        const leftBoundary =
          index === 0 ? deltaDomain[0] : sampledBranches[index - 1].delta_max;
        const rightBoundary =
          index === sampledBranches.length - 1
            ? deltaDomain[1]
            : sampledBranches[index + 1].delta_min;
        const leftGap = branch.delta_min - leftBoundary;
        const rightGap = rightBoundary - branch.delta_max;
        const tubePaddingRadius = 0.25 * Math.min(leftGap, rightGap);
        const protectedInterval = [
          branch.delta_min - tubePaddingRadius,
          branch.delta_max + tubePaddingRadius,
        ];
        minimumTubePaddingRadius = Math.min(
          minimumTubePaddingRadius,
          tubePaddingRadius
        );
        retainedTubeCount += 1;
        return {
          root_index: branch.root_index,
          sampled_delta_interval: [
            formatSmallNumber(branch.delta_min),
            formatSmallNumber(branch.delta_max),
          ],
          protected_delta_interval: protectedInterval.map(formatSmallNumber),
          tube_padding_radius: formatSmallNumber(tubePaddingRadius),
          F_delta_expected_sign: branch.F_delta_sign,
          sampled_min_abs_F_delta: formatSmallNumber(branch.min_abs_F_delta),
        };
      });
      const complementSlabs = [];
      let leftCursor = deltaDomain[0];
      for (const tube of protectedTubes) {
        const tubeLeft = Number(tube.protected_delta_interval[0]);
        const tubeRight = Number(tube.protected_delta_interval[1]);
        if (tubeLeft > leftCursor) {
          const width = tubeLeft - leftCursor;
          minimumComplementSlabWidth = Math.min(
            minimumComplementSlabWidth,
            width
          );
          complementSlabs.push({
            complement_index: complementSlabs.length,
            delta_interval: [
              formatSmallNumber(leftCursor),
              formatSmallNumber(tubeLeft),
            ],
            width: formatSmallNumber(width),
          });
        }
        leftCursor = tubeRight;
      }
      if (deltaDomain[1] > leftCursor) {
        const width = deltaDomain[1] - leftCursor;
        minimumComplementSlabWidth = Math.min(
          minimumComplementSlabWidth,
          width
        );
        complementSlabs.push({
          complement_index: complementSlabs.length,
          delta_interval: [
            formatSmallNumber(leftCursor),
            formatSmallNumber(deltaDomain[1]),
          ],
          width: formatSmallNumber(width),
        });
      }
      complementSlabCount += complementSlabs.length;
      return {
        term_label: termRow.term_label,
        kappa: termRow.kappa,
        sigma: termRow.sigma,
        coefficient: termRow.coefficient,
        source_delta_domain: deltaDomain.map(formatSmallNumber),
        retained_tube_count: protectedTubes.length,
        complement_slab_count: complementSlabs.length,
        protected_tubes: protectedTubes,
        complement_slabs: complementSlabs,
      };
    });
  const finiteRootTubeTargetPassed =
    sampledRootTubeRegularityProbe.status ===
      "sampled-root-tube-regularity-feasibility-passed" &&
    minimumTubePaddingRadius > 0 &&
    minimumComplementSlabWidth > 0;
  return {
    source_delta_domain: deltaDomain.map(formatSmallNumber),
    retained_tube_count: retainedTubeCount,
    complement_slab_count: complementSlabCount,
    minimum_tube_padding_radius: minimumTubePaddingRadius,
    minimum_complement_slab_width: minimumComplementSlabWidth,
    term_target_rows: termTargetRows,
    status: finiteRootTubeTargetPassed
      ? "finite-interval-root-tube-certificate-target-emitted"
      : "finite-interval-root-tube-certificate-target-open",
  };
}

function summarizeIntervalSubdivisions({
  interval,
  subdivisionCount,
  intervalBuilder,
  expectedSign = null,
}) {
  let minimumClearance = Infinity;
  const signs = [];
  for (let index = 0; index < subdivisionCount; index += 1) {
    const subinterval = subintervalForIndex({
      interval,
      index,
      count: subdivisionCount,
    });
    const enclosure = intervalBuilder(subinterval);
    const signInfo = intervalSignAndClearance(enclosure);
    signs.push(signInfo.sign);
    minimumClearance = Math.min(minimumClearance, signInfo.clearance);
  }
  const uniqueSigns = uniqueSortedStrings(signs);
  const signDefinite = uniqueSigns.length === 1 && uniqueSigns[0] !== "mixed";
  const matchesExpectedSign =
    expectedSign === null
      ? signDefinite
      : signDefinite && uniqueSigns[0] === expectedSign;
  return {
    signs: uniqueSigns,
    sign_definite: signDefinite,
    matches_expected_sign: matchesExpectedSign,
    minimum_clearance: minimumClearance,
  };
}

function buildDirectedRoundedSourceRootIntervalCertificate({
  finiteIntervalRootTubeCertificateTarget,
  thetaInterval,
  speedRatioInterval,
  fDeltaSubdivisionCount,
  complementSubdivisionCount,
}) {
  let totalTubeEndpointSignPairIntervalCount = 0;
  let totalTubeEndpointFIntervalCount = 0;
  let totalTubeFDeltaIntervalCount = 0;
  let totalComplementFIntervalCount = 0;
  let minimumTubeEndpointIntervalAbsF = Infinity;
  let minimumTubeEndpointIntervalSignProductMargin = Infinity;
  let minimumTubeIntervalAbsFDelta = Infinity;
  let minimumComplementIntervalAbsF = Infinity;
  let allTubeEndpointIntervalsOpposite = true;
  let allTubeFDeltaIntervalsMatchTarget = true;
  let allComplementIntervalsExcludeZero = true;
  let allComplementIntervalSignsStable = true;
  const termCertificateRows =
    finiteIntervalRootTubeCertificateTarget.term_target_rows.map((termRow) => {
      const thetaTildeInterval = sourceThetaTildeIntervalForTerm({
        thetaInterval,
        termLabel: termRow.term_label,
      });
      const tubeRows = termRow.protected_tubes.map((tube) => {
        const protectedInterval = tube.protected_delta_interval.map(Number);
        const leftFInterval = sourceRootEquationInterval({
          speedRatioInterval,
          kappa: termRow.kappa,
          thetaTildeInterval,
          deltaInterval: [protectedInterval[0], protectedInterval[0]],
        });
        const rightFInterval = sourceRootEquationInterval({
          speedRatioInterval,
          kappa: termRow.kappa,
          thetaTildeInterval,
          deltaInterval: [protectedInterval[1], protectedInterval[1]],
        });
        const leftSignInfo = intervalSignAndClearance(leftFInterval);
        const rightSignInfo = intervalSignAndClearance(rightFInterval);
        const endpointSignsOpposite =
          leftSignInfo.sign !== "mixed" &&
          rightSignInfo.sign !== "mixed" &&
          leftSignInfo.sign !== rightSignInfo.sign;
        const endpointClearance = Math.min(
          leftSignInfo.clearance,
          rightSignInfo.clearance
        );
        const endpointSignProductMargin =
          leftSignInfo.clearance * rightSignInfo.clearance;
        const FDeltaSummary = summarizeIntervalSubdivisions({
          interval: protectedInterval,
          subdivisionCount: fDeltaSubdivisionCount,
          expectedSign: tube.F_delta_expected_sign,
          intervalBuilder: (deltaInterval) =>
            sourceRootDeltaDerivativeInterval({
              speedRatioInterval,
              kappa: termRow.kappa,
              thetaTildeInterval,
              deltaInterval,
            }),
        });
        totalTubeEndpointSignPairIntervalCount += 1;
        totalTubeEndpointFIntervalCount += 2;
        totalTubeFDeltaIntervalCount += fDeltaSubdivisionCount;
        allTubeEndpointIntervalsOpposite =
          allTubeEndpointIntervalsOpposite && endpointSignsOpposite;
        allTubeFDeltaIntervalsMatchTarget =
          allTubeFDeltaIntervalsMatchTarget &&
          FDeltaSummary.matches_expected_sign;
        minimumTubeEndpointIntervalAbsF = Math.min(
          minimumTubeEndpointIntervalAbsF,
          endpointClearance
        );
        minimumTubeEndpointIntervalSignProductMargin = Math.min(
          minimumTubeEndpointIntervalSignProductMargin,
          endpointSignProductMargin
        );
        minimumTubeIntervalAbsFDelta = Math.min(
          minimumTubeIntervalAbsFDelta,
          Number(FDeltaSummary.minimum_clearance)
        );
        return {
          root_index: tube.root_index,
          protected_delta_interval: tube.protected_delta_interval,
          F_delta_expected_sign: tube.F_delta_expected_sign,
          endpoint_signs_opposite: endpointSignsOpposite,
          endpoint_clearance: formatSmallNumber(endpointClearance),
          F_delta_summary: {
            signs: FDeltaSummary.signs,
            sign_definite: FDeltaSummary.sign_definite,
            matches_expected_sign: FDeltaSummary.matches_expected_sign,
            minimum_clearance: formatSmallNumber(
              FDeltaSummary.minimum_clearance
            ),
          },
        };
      });
      const complementRows = termRow.complement_slabs.map((slab) => {
        const deltaInterval = slab.delta_interval.map(Number);
        const complementSummary = summarizeIntervalSubdivisions({
          interval: deltaInterval,
          subdivisionCount: complementSubdivisionCount,
          intervalBuilder: (subinterval) =>
            sourceRootEquationInterval({
              speedRatioInterval,
              kappa: termRow.kappa,
              thetaTildeInterval,
              deltaInterval: subinterval,
            }),
        });
        const complementSignsStable =
          complementSummary.sign_definite &&
          complementSummary.signs.length === 1;
        totalComplementFIntervalCount += complementSubdivisionCount;
        allComplementIntervalsExcludeZero =
          allComplementIntervalsExcludeZero &&
          complementSummary.sign_definite;
        allComplementIntervalSignsStable =
          allComplementIntervalSignsStable && complementSignsStable;
        minimumComplementIntervalAbsF = Math.min(
          minimumComplementIntervalAbsF,
          Number(complementSummary.minimum_clearance)
        );
        return {
          complement_index: slab.complement_index,
          delta_interval: slab.delta_interval,
          complement_subdivision_summary: {
            signs: complementSummary.signs,
            sign_definite: complementSummary.sign_definite,
            minimum_clearance: formatSmallNumber(
              complementSummary.minimum_clearance
            ),
          },
        };
      });
      return {
        term_label: termRow.term_label,
        kappa: termRow.kappa,
        sigma: termRow.sigma,
        coefficient: termRow.coefficient,
        protected_tube_count: tubeRows.length,
        complement_slab_count: complementRows.length,
        protected_tubes: tubeRows,
        complement_slabs: complementRows,
      };
    });
  const passed =
    finiteIntervalRootTubeCertificateTarget.status ===
      "finite-interval-root-tube-certificate-target-emitted" &&
    allTubeEndpointIntervalsOpposite &&
    allTubeFDeltaIntervalsMatchTarget &&
    allComplementIntervalsExcludeZero &&
    allComplementIntervalSignsStable &&
    minimumTubeEndpointIntervalAbsF > 0 &&
    minimumTubeEndpointIntervalSignProductMargin > 0 &&
    minimumTubeIntervalAbsFDelta > 0 &&
    minimumComplementIntervalAbsF > 0;
  return {
    certificate_type: "directed-rounded-source-root-interval-certificate",
    interval_rounding: "ieee-754-nextafter-outward",
    certifies_directed_rounded_source_root_interval_certificate: passed,
    certifies_directed_rounded_interval_source_root_tube_isolation: passed,
    certifies_directed_rounded_interval_source_root_sheet_continuation: passed,
    certifies_directed_rounded_interval_F_delta_lower_bound: passed,
    certifies_directed_rounded_interval_complement_exclusion: passed,
    tube_endpoint_sign_pair_interval_count:
      totalTubeEndpointSignPairIntervalCount,
    tube_endpoint_F_interval_count: totalTubeEndpointFIntervalCount,
    tube_F_delta_interval_count: totalTubeFDeltaIntervalCount,
    complement_F_interval_count: totalComplementFIntervalCount,
    all_tube_endpoint_intervals_opposite: allTubeEndpointIntervalsOpposite,
    all_tube_F_delta_intervals_match_target:
      allTubeFDeltaIntervalsMatchTarget,
    all_complement_intervals_exclude_zero: allComplementIntervalsExcludeZero,
    all_complement_interval_signs_stable: allComplementIntervalSignsStable,
    minimum_tube_endpoint_interval_abs_F: minimumTubeEndpointIntervalAbsF,
    minimum_tube_endpoint_interval_sign_product_margin:
      minimumTubeEndpointIntervalSignProductMargin,
    minimum_tube_interval_F_delta_abs: minimumTubeIntervalAbsFDelta,
    minimum_complement_interval_abs_F: minimumComplementIntervalAbsF,
    term_certificate_rows: termCertificateRows,
    status: passed
      ? "directed-rounded-source-root-interval-certificate-passed"
      : "directed-rounded-source-root-interval-certificate-open",
  };
}

function monotoneRootLowerEndpointPredicate({ FDeltaExpectedSign, FInterval }) {
  return FDeltaExpectedSign === "+" ? FInterval[1] <= 0 : FInterval[0] >= 0;
}

function monotoneRootUpperEndpointPredicate({ FDeltaExpectedSign, FInterval }) {
  return FDeltaExpectedSign === "+" ? FInterval[0] >= 0 : FInterval[1] <= 0;
}

function contractSourceRootIntervalByMonotonicity({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  protectedInterval,
  FDeltaExpectedSign,
}) {
  const endpointFInterval = (delta) =>
    sourceRootEquationInterval({
      speedRatioInterval,
      kappa,
      thetaTildeInterval,
      deltaInterval: [delta, delta],
    });
  const leftEndpointFInterval = endpointFInterval(protectedInterval[0]);
  const rightEndpointFInterval = endpointFInterval(protectedInterval[1]);
  const leftPredicate = monotoneRootLowerEndpointPredicate({
    FDeltaExpectedSign,
    FInterval: leftEndpointFInterval,
  });
  const rightPredicate = monotoneRootUpperEndpointPredicate({
    FDeltaExpectedSign,
    FInterval: rightEndpointFInterval,
  });
  if (!leftPredicate || !rightPredicate) {
    return {
      contracted: false,
      contracted_delta_interval: protectedInterval,
      protected_delta_width: intervalWidth(protectedInterval),
      contracted_delta_width: intervalWidth(protectedInterval),
      width_reduction_factor: 1,
    };
  }
  let lowerGood = protectedInterval[0];
  let lowerBad = protectedInterval[1];
  for (
    let iteration = 0;
    iteration < SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS;
    iteration += 1
  ) {
    const midpoint = 0.5 * (lowerGood + lowerBad);
    const midpointFInterval = endpointFInterval(midpoint);
    if (
      monotoneRootLowerEndpointPredicate({
        FDeltaExpectedSign,
        FInterval: midpointFInterval,
      })
    ) {
      lowerGood = midpoint;
    } else {
      lowerBad = midpoint;
    }
  }
  let upperBad = protectedInterval[0];
  let upperGood = protectedInterval[1];
  for (
    let iteration = 0;
    iteration < SOURCE_ROOT_CONTRACTION_BISECTION_ITERATIONS;
    iteration += 1
  ) {
    const midpoint = 0.5 * (upperBad + upperGood);
    const midpointFInterval = endpointFInterval(midpoint);
    if (
      monotoneRootUpperEndpointPredicate({
        FDeltaExpectedSign,
        FInterval: midpointFInterval,
      })
    ) {
      upperGood = midpoint;
    } else {
      upperBad = midpoint;
    }
  }
  const contractionOrderingValid = lowerGood <= upperGood;
  const contractedInterval = contractionOrderingValid
    ? [nextDown(lowerGood), nextUp(upperGood)]
    : protectedInterval;
  const protectedWidth = intervalWidth(protectedInterval);
  const contractedWidth = intervalWidth(contractedInterval);
  return {
    contracted: contractionOrderingValid,
    contracted_delta_interval: contractedInterval,
    protected_delta_width: protectedWidth,
    contracted_delta_width: contractedWidth,
    width_reduction_factor:
      contractedWidth > 0 ? protectedWidth / contractedWidth : Infinity,
  };
}

function buildCrossBinaryForcingIntervalFromCertifiedRootTubes({
  thetaInterval,
  speedRatioInterval,
  directedRoundedSourceRootIntervalCertificate,
  fDeltaSubdivisionCount,
}) {
  let crossBinaryForcingInterval = [0, 0];
  let allRootContractionsPassed = true;
  let allFDeltaSignsMatch = true;
  let minimumFDeltaAbsClearance = Infinity;
  let totalRootSheetContractionCount = 0;
  let sourceValueIntervalEvaluationCount = 0;
  let maximumContractedDeltaWidth = 0;
  const termRows =
    directedRoundedSourceRootIntervalCertificate.term_certificate_rows.map(
      (termRow) => {
        const coefficient =
          termRow.coefficient ?? crossBinaryCoefficientForTerm(termRow.term_label);
        const thetaTildeInterval = sourceThetaTildeIntervalForTerm({
          thetaInterval,
          termLabel: termRow.term_label,
        });
        let termForcingInterval = [0, 0];
        const rootRows = termRow.protected_tubes.map((tube) => {
          const protectedInterval = tube.protected_delta_interval.map(Number);
          const rootContraction = contractSourceRootIntervalByMonotonicity({
            speedRatioInterval,
            kappa: termRow.kappa,
            thetaTildeInterval,
            protectedInterval,
            FDeltaExpectedSign: tube.F_delta_expected_sign,
          });
          const deltaInterval = rootContraction.contracted
            ? rootContraction.contracted_delta_interval
            : protectedInterval;
          let rootForcingInterval = null;
          totalRootSheetContractionCount += 1;
          allRootContractionsPassed =
            allRootContractionsPassed && rootContraction.contracted;
          maximumContractedDeltaWidth = Math.max(
            maximumContractedDeltaWidth,
            rootContraction.contracted_delta_width
          );
          for (let index = 0; index < fDeltaSubdivisionCount; index += 1) {
            const deltaSubinterval = subintervalForIndex({
              interval: deltaInterval,
              index,
              count: fDeltaSubdivisionCount,
            });
            const sourceValue = sourceContributionValueInterval({
              speedRatioInterval,
              kappa: termRow.kappa,
              sigma: termRow.sigma,
              thetaTildeInterval,
              deltaInterval: deltaSubinterval,
              FDeltaExpectedSign: tube.F_delta_expected_sign,
            });
            sourceValueIntervalEvaluationCount += 1;
            rootForcingInterval =
              rootForcingInterval === null
                ? sourceValue.value_interval
                : hullIntervals(rootForcingInterval, sourceValue.value_interval);
            allFDeltaSignsMatch =
              allFDeltaSignsMatch && sourceValue.F_delta_sign_matches_expected;
            minimumFDeltaAbsClearance = Math.min(
              minimumFDeltaAbsClearance,
              sourceValue.minimum_F_delta_abs_clearance
            );
          }
          termForcingInterval = addIntervals(
            termForcingInterval,
            rootForcingInterval
          );
          return {
            root_index: tube.root_index,
            contracted: rootContraction.contracted,
            contracted_delta_interval: formatInterval(deltaInterval),
            contracted_delta_width: formatSmallNumber(
              rootContraction.contracted_delta_width
            ),
            root_forcing_interval: formatInterval(rootForcingInterval),
          };
        });
        crossBinaryForcingInterval = addIntervals(
          crossBinaryForcingInterval,
          scaleInterval(termForcingInterval, coefficient)
        );
        return {
          term_label: termRow.term_label,
          coefficient,
          term_forcing_interval: formatInterval(termForcingInterval),
          root_rows: rootRows,
        };
      }
    );
  const signInfo = intervalSignAndClearance(crossBinaryForcingInterval);
  return {
    cross_binary_forcing_interval: crossBinaryForcingInterval,
    forcing_sign: signInfo.sign,
    forcing_sign_clearance: signInfo.clearance,
    all_root_sheet_contractions_passed: allRootContractionsPassed,
    all_F_delta_signs_match_expected: allFDeltaSignsMatch,
    minimum_F_delta_abs_clearance: minimumFDeltaAbsClearance,
    total_root_sheet_contraction_count: totalRootSheetContractionCount,
    source_value_interval_evaluation_count: sourceValueIntervalEvaluationCount,
    maximum_contracted_delta_width: maximumContractedDeltaWidth,
    term_rows: termRows,
  };
}

function buildCrossBinaryForcingAndDerivativeIntervalFromCertifiedRootTubes({
  thetaInterval,
  speedRatioInterval,
  directedRoundedSourceRootIntervalCertificate,
  fDeltaSubdivisionCount,
}) {
  let crossBinaryForcingInterval = [0, 0];
  let crossBinaryDerivativeInterval = [0, 0];
  let allRootContractionsPassed = true;
  let allFDeltaSignsMatch = true;
  let minimumFDeltaAbsClearance = Infinity;
  let totalRootSheetContractionCount = 0;
  let sourceValueIntervalEvaluationCount = 0;
  let maximumContractedDeltaWidth = 0;
  const termRows =
    directedRoundedSourceRootIntervalCertificate.term_certificate_rows.map(
      (termRow) => {
        const coefficient =
          termRow.coefficient ?? crossBinaryCoefficientForTerm(termRow.term_label);
        const thetaTildeInterval = sourceThetaTildeIntervalForTerm({
          thetaInterval,
          termLabel: termRow.term_label,
        });
        let termForcingInterval = [0, 0];
        let termDerivativeInterval = [0, 0];
        const rootRows = termRow.protected_tubes.map((tube) => {
          const protectedInterval = tube.protected_delta_interval.map(Number);
          const rootContraction = contractSourceRootIntervalByMonotonicity({
            speedRatioInterval,
            kappa: termRow.kappa,
            thetaTildeInterval,
            protectedInterval,
            FDeltaExpectedSign: tube.F_delta_expected_sign,
          });
          const deltaInterval = rootContraction.contracted
            ? rootContraction.contracted_delta_interval
            : protectedInterval;
          let rootForcingInterval = null;
          let rootDerivativeInterval = null;
          totalRootSheetContractionCount += 1;
          allRootContractionsPassed =
            allRootContractionsPassed && rootContraction.contracted;
          maximumContractedDeltaWidth = Math.max(
            maximumContractedDeltaWidth,
            rootContraction.contracted_delta_width
          );
          for (let index = 0; index < fDeltaSubdivisionCount; index += 1) {
            const deltaSubinterval = subintervalForIndex({
              interval: deltaInterval,
              index,
              count: fDeltaSubdivisionCount,
            });
            const sourceValue = sourceContributionValueAndDerivativeInterval({
              speedRatioInterval,
              kappa: termRow.kappa,
              sigma: termRow.sigma,
              thetaTildeInterval,
              deltaInterval: deltaSubinterval,
              FDeltaExpectedSign: tube.F_delta_expected_sign,
            });
            sourceValueIntervalEvaluationCount += 1;
            rootForcingInterval =
              rootForcingInterval === null
                ? sourceValue.value_interval
                : hullIntervals(rootForcingInterval, sourceValue.value_interval);
            rootDerivativeInterval =
              rootDerivativeInterval === null
                ? sourceValue.derivative_interval
                : hullIntervals(
                    rootDerivativeInterval,
                    sourceValue.derivative_interval
                  );
            allFDeltaSignsMatch =
              allFDeltaSignsMatch && sourceValue.F_delta_sign_matches_expected;
            minimumFDeltaAbsClearance = Math.min(
              minimumFDeltaAbsClearance,
              sourceValue.minimum_F_delta_abs_clearance
            );
          }
          termForcingInterval = addIntervals(
            termForcingInterval,
            rootForcingInterval
          );
          termDerivativeInterval = addIntervals(
            termDerivativeInterval,
            rootDerivativeInterval
          );
          return {
            root_index: tube.root_index,
            contracted: rootContraction.contracted,
            contracted_delta_interval: formatInterval(deltaInterval),
            contracted_delta_width: formatSmallNumber(
              rootContraction.contracted_delta_width
            ),
            root_forcing_interval: formatInterval(rootForcingInterval),
            root_derivative_interval: formatInterval(rootDerivativeInterval),
          };
        });
        crossBinaryForcingInterval = addIntervals(
          crossBinaryForcingInterval,
          scaleInterval(termForcingInterval, coefficient)
        );
        crossBinaryDerivativeInterval = addIntervals(
          crossBinaryDerivativeInterval,
          scaleInterval(termDerivativeInterval, coefficient)
        );
        return {
          term_label: termRow.term_label,
          coefficient,
          term_forcing_interval: formatInterval(termForcingInterval),
          term_derivative_interval: formatInterval(termDerivativeInterval),
          root_rows: rootRows,
        };
      }
    );
  const forcingSignInfo = intervalSignAndClearance(crossBinaryForcingInterval);
  const derivativeSignInfo = intervalSignAndClearance(crossBinaryDerivativeInterval);
  return {
    cross_binary_forcing_interval: crossBinaryForcingInterval,
    cross_binary_derivative_interval: crossBinaryDerivativeInterval,
    forcing_sign: forcingSignInfo.sign,
    forcing_sign_clearance: forcingSignInfo.clearance,
    derivative_sign: derivativeSignInfo.sign,
    derivative_sign_clearance: derivativeSignInfo.clearance,
    all_root_sheet_contractions_passed: allRootContractionsPassed,
    all_F_delta_signs_match_expected: allFDeltaSignsMatch,
    minimum_F_delta_abs_clearance: minimumFDeltaAbsClearance,
    total_root_sheet_contraction_count: totalRootSheetContractionCount,
    source_value_interval_evaluation_count: sourceValueIntervalEvaluationCount,
    maximum_contracted_delta_width: maximumContractedDeltaWidth,
    term_rows: termRows,
  };
}

function certifyTile({
  tileId,
  complementId,
  thetaInterval,
  expectedSign,
  speedRatioInterval,
  rootSubdivisions,
  fDeltaSubdivisionCount,
  complementSubdivisionCount,
}) {
  const sampleRows = buildTileSampleRows({
    thetaInterval,
    speedRatioInterval,
    rootSubdivisions,
  });
  const sampleForcingValues = sampleRows.map((row) => row.forcing);
  const sampledRootCountPreserved = sampleRows.every(
    (row) =>
      row.source_root_count === EXPECTED_SOURCE_ROOT_COUNT &&
      row.term_root_count_signature.join(",") === EXPECTED_TERM_SIGNATURE
  );
  const sampledSignPreserved = sampleRows.every((row) =>
    expectedSign === "+" ? row.forcing > 0 : row.forcing < 0
  );
  const sampledRootTubeRegularityProbe =
    buildSampledRootTubeRegularityProbe(sampleRows);
  const finiteIntervalRootTubeCertificateTarget =
    buildFiniteIntervalRootTubeCertificateTarget({
      sampledRootTubeRegularityProbe,
      speedRatioInterval,
    });
  const directedRoundedSourceRootIntervalCertificate =
    buildDirectedRoundedSourceRootIntervalCertificate({
      finiteIntervalRootTubeCertificateTarget,
      thetaInterval,
      speedRatioInterval,
      fDeltaSubdivisionCount,
      complementSubdivisionCount,
    });
  const forcingIntervalRow =
    directedRoundedSourceRootIntervalCertificate.status ===
    "directed-rounded-source-root-interval-certificate-passed"
      ? buildCrossBinaryForcingIntervalFromCertifiedRootTubes({
          thetaInterval,
          speedRatioInterval,
          directedRoundedSourceRootIntervalCertificate,
          fDeltaSubdivisionCount,
        })
      : {
          cross_binary_forcing_interval: [-Infinity, Infinity],
          forcing_sign: "mixed",
          forcing_sign_clearance: 0,
          all_root_sheet_contractions_passed: false,
          all_F_delta_signs_match_expected: false,
          minimum_F_delta_abs_clearance: 0,
          total_root_sheet_contraction_count: 0,
          source_value_interval_evaluation_count: 0,
          maximum_contracted_delta_width: Infinity,
          term_rows: [],
        };
  const passed =
    sampledRootCountPreserved &&
    sampledSignPreserved &&
    directedRoundedSourceRootIntervalCertificate.status ===
      "directed-rounded-source-root-interval-certificate-passed" &&
    forcingIntervalRow.all_root_sheet_contractions_passed &&
    forcingIntervalRow.all_F_delta_signs_match_expected &&
    forcingIntervalRow.forcing_sign === expectedSign &&
    forcingIntervalRow.forcing_sign_clearance > 0;
  return {
    tile_id: tileId,
    complement_id: complementId,
    theta_interval: formatInterval(thetaInterval),
    speed_ratio_interval: formatInterval(speedRatioInterval),
    expected_forcing_sign: expectedSign,
    sampled_forcing_minimum: formatSmallNumber(Math.min(...sampleForcingValues)),
    sampled_forcing_maximum: formatSmallNumber(Math.max(...sampleForcingValues)),
    sampled_root_count_preserved: sampledRootCountPreserved,
    sampled_sign_preserved: sampledSignPreserved,
    sampled_root_tube_status: sampledRootTubeRegularityProbe.status,
    directed_rounded_source_root_status:
      directedRoundedSourceRootIntervalCertificate.status,
    directed_rounded_forcing_interval: formatInterval(
      forcingIntervalRow.cross_binary_forcing_interval
    ),
    directed_rounded_forcing_sign: forcingIntervalRow.forcing_sign,
    directed_rounded_forcing_sign_clearance: formatSmallNumber(
      forcingIntervalRow.forcing_sign_clearance
    ),
    all_root_sheet_contractions_passed:
      forcingIntervalRow.all_root_sheet_contractions_passed,
    minimum_directed_rounded_tube_endpoint_interval_abs_F:
      formatSmallNumber(
        directedRoundedSourceRootIntervalCertificate
          .minimum_tube_endpoint_interval_abs_F
      ),
    minimum_directed_rounded_tube_interval_F_delta_abs: formatSmallNumber(
      directedRoundedSourceRootIntervalCertificate.minimum_tube_interval_F_delta_abs
    ),
    minimum_directed_rounded_complement_interval_abs_F: formatSmallNumber(
      directedRoundedSourceRootIntervalCertificate.minimum_complement_interval_abs_F
    ),
    minimum_forcing_interval_F_delta_abs: formatSmallNumber(
      forcingIntervalRow.minimum_F_delta_abs_clearance
    ),
    maximum_contracted_delta_width: formatSmallNumber(
      forcingIntervalRow.maximum_contracted_delta_width
    ),
    root_sheet_contraction_count:
      forcingIntervalRow.total_root_sheet_contraction_count,
    source_value_interval_evaluation_count:
      forcingIntervalRow.source_value_interval_evaluation_count,
    status: passed
      ? "directed-rounded-compact-complement-tile-sign-certified"
      : "directed-rounded-compact-complement-tile-sign-open",
  };
}

function initialThetaTiles({ interval, count }) {
  return Array.from({ length: count }, (_entry, index) => ({
    thetaInterval: subintervalForIndex({ interval, index, count }),
    depth: 0,
  }));
}

function buildAdaptiveComplementEnclosure({
  complementId,
  thetaInterval,
  expectedSign,
  initialThetaCellCount,
  maxAdaptiveDepth,
  speedRatioInterval,
  rootSubdivisions,
  fDeltaSubdivisionCount,
  complementSubdivisionCount,
}) {
  const queue = initialThetaTiles({
    interval: thetaInterval,
    count: initialThetaCellCount,
  });
  const certifiedTiles = [];
  const openTiles = [];
  let attemptedTileCount = 0;
  while (queue.length > 0) {
    const { thetaInterval: candidateThetaInterval, depth } = queue.shift();
    attemptedTileCount += 1;
    const tile = certifyTile({
      tileId: `${complementId}.tile.${certifiedTiles.length + openTiles.length}`,
      complementId,
      thetaInterval: candidateThetaInterval,
      expectedSign,
      speedRatioInterval,
      rootSubdivisions,
      fDeltaSubdivisionCount,
      complementSubdivisionCount,
    });
    if (tile.status === "directed-rounded-compact-complement-tile-sign-certified") {
      certifiedTiles.push(tile);
    } else if (depth < maxAdaptiveDepth) {
      const midpoint = 0.5 * (candidateThetaInterval[0] + candidateThetaInterval[1]);
      queue.unshift(
        { thetaInterval: [midpoint, candidateThetaInterval[1]], depth: depth + 1 },
        { thetaInterval: [candidateThetaInterval[0], midpoint], depth: depth + 1 }
      );
    } else {
      openTiles.push({ ...tile, adaptive_depth: depth });
    }
  }
  const passed = openTiles.length === 0 && certifiedTiles.length > 0;
  const forcingClearances = certifiedTiles.map((tile) =>
    Number(tile.directed_rounded_forcing_sign_clearance)
  );
  const endpointMargins = certifiedTiles.map((tile) =>
    Number(tile.minimum_directed_rounded_tube_endpoint_interval_abs_F)
  );
  const fDeltaMargins = certifiedTiles.map((tile) =>
    Number(tile.minimum_directed_rounded_tube_interval_F_delta_abs)
  );
  const complementMargins = certifiedTiles.map((tile) =>
    Number(tile.minimum_directed_rounded_complement_interval_abs_F)
  );
  return {
    complement_id: complementId,
    theta_interval: formatInterval(thetaInterval),
    expected_forcing_sign: expectedSign,
    initial_theta_cell_count: initialThetaCellCount,
    max_adaptive_depth: maxAdaptiveDepth,
    attempted_tile_count: attemptedTileCount,
    certified_tile_count: certifiedTiles.length,
    open_tile_count: openTiles.length,
    minimum_directed_rounded_forcing_sign_clearance:
      forcingClearances.length === 0
        ? null
        : formatSmallNumber(Math.min(...forcingClearances)),
    minimum_directed_rounded_tube_endpoint_interval_abs_F:
      endpointMargins.length === 0
        ? null
        : formatSmallNumber(Math.min(...endpointMargins)),
    minimum_directed_rounded_tube_interval_F_delta_abs:
      fDeltaMargins.length === 0
        ? null
        : formatSmallNumber(Math.min(...fDeltaMargins)),
    minimum_directed_rounded_complement_interval_abs_F:
      complementMargins.length === 0
        ? null
        : formatSmallNumber(Math.min(...complementMargins)),
    certified_tiles: certifiedTiles,
    open_tiles: openTiles,
    status: passed
      ? "directed-rounded-compact-complement-sign-enclosure-certified"
      : "directed-rounded-compact-complement-sign-enclosure-open",
  };
}

function thetaIntervalForLeftFoldYInterval(yInterval) {
  const [yLeft, yRight] = yInterval;
  return [
    nextDown(THETA_3_MINUS - yRight * yRight),
    nextUp(THETA_3_MINUS - yLeft * yLeft),
  ];
}

function initialYTiles({ yInterval, count }) {
  return Array.from({ length: count }, (_entry, index) => ({
    yInterval: subintervalForIndex({ interval: yInterval, index, count }),
    depth: 0,
  }));
}

function certifyFoldCollarYTile({
  tileId,
  yInterval,
  expectedGSign,
  expectedDSign,
  speedRatioInterval,
  rootSubdivisions,
  fDeltaSubdivisionCount,
  complementSubdivisionCount,
}) {
  const thetaInterval = thetaIntervalForLeftFoldYInterval(yInterval);
  const sampleRows = buildTileSampleRows({
    thetaInterval,
    speedRatioInterval,
    rootSubdivisions,
  });
  const sampleRowsWithTransport = sampleRows.map((sample) => {
    const y = Math.sqrt(Math.max(0, THETA_3_MINUS - sample.theta));
    const derivativeEvaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
      speedRatio: sample.speed_ratio,
      theta: sample.theta,
      rootSubdivisions,
    });
    const G = 2 * y * derivativeEvaluation.value;
    const D = 4 * y ** 3 * derivativeEvaluation.derivative;
    return {
      theta: sample.theta,
      y,
      speed_ratio: sample.speed_ratio,
      forcing: derivativeEvaluation.value,
      derivative: derivativeEvaluation.derivative,
      G,
      D,
      G_sign: signLabel(G),
      D_sign: signLabel(D),
      source_root_count: derivativeEvaluation.source_root_count,
      term_root_count_signature: derivativeEvaluation.terms.map(
        (term) => term.root_count
      ),
    };
  });
  const sampledRootCountPreserved = sampleRowsWithTransport.every(
    (row) =>
      row.source_root_count === EXPECTED_SOURCE_ROOT_COUNT &&
      row.term_root_count_signature.join(",") === EXPECTED_TERM_SIGNATURE
  );
  const sampledTransportSignsPreserved = sampleRowsWithTransport.every(
    (row) => row.G_sign === expectedGSign && row.D_sign === expectedDSign
  );
  const sampledRootTubeRegularityProbe =
    buildSampledRootTubeRegularityProbe(sampleRows);
  const finiteIntervalRootTubeCertificateTarget =
    buildFiniteIntervalRootTubeCertificateTarget({
      sampledRootTubeRegularityProbe,
      speedRatioInterval,
    });
  const directedRoundedSourceRootIntervalCertificate =
    buildDirectedRoundedSourceRootIntervalCertificate({
      finiteIntervalRootTubeCertificateTarget,
      thetaInterval,
      speedRatioInterval,
      fDeltaSubdivisionCount,
      complementSubdivisionCount,
    });
  const forcingDerivativeIntervalRow =
    directedRoundedSourceRootIntervalCertificate.status ===
    "directed-rounded-source-root-interval-certificate-passed"
      ? buildCrossBinaryForcingAndDerivativeIntervalFromCertifiedRootTubes({
          thetaInterval,
          speedRatioInterval,
          directedRoundedSourceRootIntervalCertificate,
          fDeltaSubdivisionCount,
        })
      : {
          cross_binary_forcing_interval: [-Infinity, Infinity],
          cross_binary_derivative_interval: [-Infinity, Infinity],
          forcing_sign: "mixed",
          forcing_sign_clearance: 0,
          derivative_sign: "mixed",
          derivative_sign_clearance: 0,
          all_root_sheet_contractions_passed: false,
          all_F_delta_signs_match_expected: false,
          minimum_F_delta_abs_clearance: 0,
          total_root_sheet_contraction_count: 0,
          source_value_interval_evaluation_count: 0,
          maximum_contracted_delta_width: Infinity,
          term_rows: [],
        };
  const GInterval = multiplyIntervals(
    [nextDown(2 * yInterval[0]), nextUp(2 * yInterval[1])],
    forcingDerivativeIntervalRow.cross_binary_forcing_interval
  );
  const DInterval = multiplyIntervals(
    scaleInterval(positivePowerInterval(yInterval, 3), 4),
    forcingDerivativeIntervalRow.cross_binary_derivative_interval
  );
  const GSignInfo = intervalSignAndClearance(GInterval);
  const DSignInfo = intervalSignAndClearance(DInterval);
  const passed =
    sampledRootCountPreserved &&
    sampledTransportSignsPreserved &&
    directedRoundedSourceRootIntervalCertificate.status ===
      "directed-rounded-source-root-interval-certificate-passed" &&
    forcingDerivativeIntervalRow.all_root_sheet_contractions_passed &&
    forcingDerivativeIntervalRow.all_F_delta_signs_match_expected &&
    GSignInfo.sign === expectedGSign &&
    DSignInfo.sign === expectedDSign &&
    GSignInfo.clearance > 0 &&
    DSignInfo.clearance > 0;
  return {
    tile_id: tileId,
    y_interval: formatInterval(yInterval),
    theta_interval: formatInterval(thetaInterval),
    speed_ratio_interval: formatInterval(speedRatioInterval),
    expected_G_sign: expectedGSign,
    expected_D_sign: expectedDSign,
    sampled_G_minimum: formatSmallNumber(
      Math.min(...sampleRowsWithTransport.map((row) => row.G))
    ),
    sampled_G_maximum: formatSmallNumber(
      Math.max(...sampleRowsWithTransport.map((row) => row.G))
    ),
    sampled_D_minimum: formatSmallNumber(
      Math.min(...sampleRowsWithTransport.map((row) => row.D))
    ),
    sampled_D_maximum: formatSmallNumber(
      Math.max(...sampleRowsWithTransport.map((row) => row.D))
    ),
    sampled_root_count_preserved: sampledRootCountPreserved,
    sampled_transport_signs_preserved: sampledTransportSignsPreserved,
    sampled_root_tube_status: sampledRootTubeRegularityProbe.status,
    directed_rounded_source_root_status:
      directedRoundedSourceRootIntervalCertificate.status,
    directed_rounded_forcing_interval: formatInterval(
      forcingDerivativeIntervalRow.cross_binary_forcing_interval
    ),
    directed_rounded_derivative_interval: formatInterval(
      forcingDerivativeIntervalRow.cross_binary_derivative_interval
    ),
    directed_rounded_G_interval: formatInterval(GInterval),
    directed_rounded_D_interval: formatInterval(DInterval),
    directed_rounded_G_sign: GSignInfo.sign,
    directed_rounded_D_sign: DSignInfo.sign,
    directed_rounded_G_sign_clearance: formatSmallNumber(GSignInfo.clearance),
    directed_rounded_D_sign_clearance: formatSmallNumber(DSignInfo.clearance),
    all_root_sheet_contractions_passed:
      forcingDerivativeIntervalRow.all_root_sheet_contractions_passed,
    minimum_directed_rounded_tube_endpoint_interval_abs_F:
      formatSmallNumber(
        directedRoundedSourceRootIntervalCertificate
          .minimum_tube_endpoint_interval_abs_F
      ),
    minimum_directed_rounded_tube_interval_F_delta_abs: formatSmallNumber(
      directedRoundedSourceRootIntervalCertificate.minimum_tube_interval_F_delta_abs
    ),
    minimum_directed_rounded_complement_interval_abs_F: formatSmallNumber(
      directedRoundedSourceRootIntervalCertificate.minimum_complement_interval_abs_F
    ),
    minimum_forcing_derivative_interval_F_delta_abs: formatSmallNumber(
      forcingDerivativeIntervalRow.minimum_F_delta_abs_clearance
    ),
    maximum_contracted_delta_width: formatSmallNumber(
      forcingDerivativeIntervalRow.maximum_contracted_delta_width
    ),
    root_sheet_contraction_count:
      forcingDerivativeIntervalRow.total_root_sheet_contraction_count,
    source_value_interval_evaluation_count:
      forcingDerivativeIntervalRow.source_value_interval_evaluation_count,
    status: passed
      ? "directed-rounded-fold-collar-finite-y-tile-GD-sign-certified"
      : "directed-rounded-fold-collar-finite-y-tile-GD-sign-open",
  };
}

function buildAdaptiveFoldCollarFiniteSlabEnclosure({
  yInterval,
  expectedGSign,
  expectedDSign,
  initialYCellCount,
  maxAdaptiveDepth,
  speedRatioInterval,
  rootSubdivisions,
  fDeltaSubdivisionCount,
  complementSubdivisionCount,
}) {
  const queue = initialYTiles({ yInterval, count: initialYCellCount });
  const certifiedTiles = [];
  const openTiles = [];
  let attemptedTileCount = 0;
  while (queue.length > 0) {
    const { yInterval: candidateYInterval, depth } = queue.shift();
    attemptedTileCount += 1;
    const tile = certifyFoldCollarYTile({
      tileId: `theta_3minus.left-fold-collar.finite-y.tile.${certifiedTiles.length + openTiles.length}`,
      yInterval: candidateYInterval,
      expectedGSign,
      expectedDSign,
      speedRatioInterval,
      rootSubdivisions,
      fDeltaSubdivisionCount,
      complementSubdivisionCount,
    });
    if (tile.status === "directed-rounded-fold-collar-finite-y-tile-GD-sign-certified") {
      certifiedTiles.push(tile);
    } else if (depth < maxAdaptiveDepth) {
      const midpoint = 0.5 * (candidateYInterval[0] + candidateYInterval[1]);
      queue.unshift(
        { yInterval: [midpoint, candidateYInterval[1]], depth: depth + 1 },
        { yInterval: [candidateYInterval[0], midpoint], depth: depth + 1 }
      );
    } else {
      openTiles.push({ ...tile, adaptive_depth: depth });
    }
  }
  const passed = openTiles.length === 0 && certifiedTiles.length > 0;
  const GMargins = certifiedTiles.map((tile) =>
    Number(tile.directed_rounded_G_sign_clearance)
  );
  const DMargins = certifiedTiles.map((tile) =>
    Number(tile.directed_rounded_D_sign_clearance)
  );
  const endpointMargins = certifiedTiles.map((tile) =>
    Number(tile.minimum_directed_rounded_tube_endpoint_interval_abs_F)
  );
  const fDeltaMargins = certifiedTiles.map((tile) =>
    Number(tile.minimum_directed_rounded_tube_interval_F_delta_abs)
  );
  const complementMargins = certifiedTiles.map((tile) =>
    Number(tile.minimum_directed_rounded_complement_interval_abs_F)
  );
  return {
    collar_id: "theta_3minus.left-fold-collar.finite-y",
    theta_substitution: "theta=theta_3minus-y^2",
    y_interval: formatInterval(yInterval),
    theta_interval: formatInterval(thetaIntervalForLeftFoldYInterval(yInterval)),
    expected_G_sign: expectedGSign,
    expected_D_sign: expectedDSign,
    initial_y_cell_count: initialYCellCount,
    max_adaptive_depth: maxAdaptiveDepth,
    attempted_tile_count: attemptedTileCount,
    certified_tile_count: certifiedTiles.length,
    open_tile_count: openTiles.length,
    minimum_directed_rounded_G_sign_clearance:
      GMargins.length === 0 ? null : formatSmallNumber(Math.min(...GMargins)),
    minimum_directed_rounded_D_sign_clearance:
      DMargins.length === 0 ? null : formatSmallNumber(Math.min(...DMargins)),
    minimum_directed_rounded_tube_endpoint_interval_abs_F:
      endpointMargins.length === 0
        ? null
        : formatSmallNumber(Math.min(...endpointMargins)),
    minimum_directed_rounded_tube_interval_F_delta_abs:
      fDeltaMargins.length === 0
        ? null
        : formatSmallNumber(Math.min(...fDeltaMargins)),
    minimum_directed_rounded_complement_interval_abs_F:
      complementMargins.length === 0
        ? null
        : formatSmallNumber(Math.min(...complementMargins)),
    certified_tiles: certifiedTiles,
    open_tiles: openTiles,
    status: passed
      ? "directed-rounded-fold-collar-finite-y-GD-sign-enclosure-certified"
      : "directed-rounded-fold-collar-finite-y-GD-sign-enclosure-open",
  };
}

function buildTheta3minusFixedFoldSideGuard({ foldCollarFiniteYMin }) {
  const upperSpeedFold = THETA_3_MINUS_SPEED_ENCLOSURE[1];
  const lowerSpeedFold = THETA_3_MINUS_SPEED_ENCLOSURE[0];
  const fixedCollarThetaAtYMin =
    THETA_3_MINUS - foldCollarFiniteYMin * foldCollarFiniteYMin;
  const speedFoldShiftClearance =
    fixedCollarThetaAtYMin < lowerSpeedFold
      ? lowerSpeedFold - fixedCollarThetaAtYMin
      : 0;
  const speedFoldCrossingThreshold = Math.sqrt(
    Math.max(0, THETA_3_MINUS - lowerSpeedFold)
  );
  const guardPassed =
    foldCollarFiniteYMin > speedFoldCrossingThreshold &&
    speedFoldShiftClearance > 0;
  return {
    guard_id: "theta_3minus.fixed-fold-left-side-speed-enclosure-guard",
    fixed_reference_theta_3minus: formatSmallNumber(THETA_3_MINUS),
    speed_endpoint_theta_3minus_enclosure: formatInterval(
      THETA_3_MINUS_SPEED_ENCLOSURE
    ),
    y_min: formatSmallNumber(foldCollarFiniteYMin),
    fixed_collar_theta_at_y_min: formatSmallNumber(fixedCollarThetaAtYMin),
    lower_speed_endpoint_fold_theta: formatSmallNumber(lowerSpeedFold),
    upper_speed_endpoint_fold_theta: formatSmallNumber(upperSpeedFold),
    speed_fold_crossing_threshold_y: formatSmallNumber(
      speedFoldCrossingThreshold
    ),
    left_side_clearance_at_y_min: formatSmallNumber(speedFoldShiftClearance),
    certifies_fixed_collar_stays_left_of_speed_endpoint_fold_sample_enclosure:
      guardPassed,
    status: guardPassed
      ? "fixed-fold-finite-collar-speed-side-guard-passed"
      : "fixed-fold-finite-collar-speed-side-guard-open",
  };
}

function buildFoldCollarResidual({ foldCollarAttachmentY, foldCollarFiniteYMin }) {
  return {
    residual_row_id: "theta_3minus.left-fold-collar-near-zero-normal-form",
    theta_substitution: "theta=theta_3minus-y^2",
    full_y_interval: [0, formatSmallNumber(foldCollarAttachmentY)],
    fixed_fold_finite_slab_probe_y_interval: [
      formatSmallNumber(foldCollarFiniteYMin),
      formatSmallNumber(foldCollarAttachmentY),
    ],
    remaining_near_zero_y_interval: [
      0,
      formatSmallNumber(foldCollarFiniteYMin),
    ],
    imported_conditional_transport_row:
      "fold.3-.left-fold-collar-sign-transport",
    imported_square_limit: -0.192715477558,
    imported_square_limit_sign: "-",
    finite_slab_transport_signs: "sampled G(y)<0 and D(y)<0; directed-rounded interval slab remains open",
    certifies_finite_fold_collar_GD_interval_slab: false,
    near_zero_obstruction:
      "below the finite slab, the theta_3minus fold must be reparameterized as a speed-dependent fold theta_3minus(v)-y^2 or controlled by a normal-form remainder theorem",
    compact_attachment_theta: formatSmallNumber(
      THETA_3_MINUS - foldCollarAttachmentY * foldCollarAttachmentY
    ),
    certifies_explicit_interval_fold_collar_radius: false,
    status: "speed-dependent-fold-normal-form-required",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const initialThetaCellCountLeft = Number.parseInt(
    options.initialThetaCellCountLeft ?? DEFAULT_INITIAL_THETA_CELL_COUNT_LEFT,
    10
  );
  const initialThetaCellCountRight = Number.parseInt(
    options.initialThetaCellCountRight ?? DEFAULT_INITIAL_THETA_CELL_COUNT_RIGHT,
    10
  );
  const maxAdaptiveDepth = Number.parseInt(
    options.maxAdaptiveDepth ?? DEFAULT_MAX_ADAPTIVE_DEPTH,
    10
  );
  const foldCollarMaxAdaptiveDepth = Number.parseInt(
    options.foldCollarMaxAdaptiveDepth ??
      DEFAULT_FOLD_COLLAR_MAX_ADAPTIVE_DEPTH,
    10
  );
  const fDeltaSubdivisionCount = Number.parseInt(
    options.fDeltaSubdivisionCount ?? DEFAULT_SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS,
    10
  );
  const complementSubdivisionCount = Number.parseInt(
    options.complementSubdivisionCount ??
      DEFAULT_SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS,
    10
  );
  const foldCollarFDeltaSubdivisionCount = Number.parseInt(
    options.foldCollarFDeltaSubdivisionCount ??
      DEFAULT_FOLD_COLLAR_SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS,
    10
  );
  const foldCollarComplementSubdivisionCount = Number.parseInt(
    options.foldCollarComplementSubdivisionCount ??
      DEFAULT_FOLD_COLLAR_SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS,
    10
  );
  const initialFoldCollarYCellCount = Number.parseInt(
    options.initialFoldCollarYCellCount ??
      DEFAULT_INITIAL_FOLD_COLLAR_Y_CELL_COUNT,
    10
  );
  const foldCollarAttachmentY = Number(
    options.foldCollarAttachmentY ?? DEFAULT_FOLD_COLLAR_ATTACHMENT_Y
  );
  const foldCollarFiniteYMin = Number(
    options.foldCollarFiniteYMin ?? DEFAULT_FOLD_COLLAR_FINITE_Y_MIN
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(initialThetaCellCountLeft) || initialThetaCellCountLeft < 1) {
    throw new Error("initialThetaCellCountLeft must be an integer >= 1");
  }
  if (!Number.isInteger(initialThetaCellCountRight) || initialThetaCellCountRight < 1) {
    throw new Error("initialThetaCellCountRight must be an integer >= 1");
  }
  if (!Number.isInteger(maxAdaptiveDepth) || maxAdaptiveDepth < 0) {
    throw new Error("maxAdaptiveDepth must be a nonnegative integer");
  }
  if (
    !Number.isInteger(foldCollarMaxAdaptiveDepth) ||
    foldCollarMaxAdaptiveDepth < 0
  ) {
    throw new Error("foldCollarMaxAdaptiveDepth must be a nonnegative integer");
  }
  if (!Number.isInteger(fDeltaSubdivisionCount) || fDeltaSubdivisionCount < 1) {
    throw new Error("fDeltaSubdivisionCount must be an integer >= 1");
  }
  if (
    !Number.isInteger(complementSubdivisionCount) ||
    complementSubdivisionCount < 1
  ) {
    throw new Error("complementSubdivisionCount must be an integer >= 1");
  }
  if (
    !Number.isInteger(foldCollarFDeltaSubdivisionCount) ||
    foldCollarFDeltaSubdivisionCount < 1
  ) {
    throw new Error("foldCollarFDeltaSubdivisionCount must be an integer >= 1");
  }
  if (
    !Number.isInteger(foldCollarComplementSubdivisionCount) ||
    foldCollarComplementSubdivisionCount < 1
  ) {
    throw new Error(
      "foldCollarComplementSubdivisionCount must be an integer >= 1"
    );
  }
  if (
    !Number.isInteger(initialFoldCollarYCellCount) ||
    initialFoldCollarYCellCount < 1
  ) {
    throw new Error("initialFoldCollarYCellCount must be an integer >= 1");
  }
  if (!Number.isFinite(foldCollarAttachmentY) || foldCollarAttachmentY <= 0) {
    throw new Error("foldCollarAttachmentY must be positive");
  }
  if (
    !Number.isFinite(foldCollarFiniteYMin) ||
    foldCollarFiniteYMin <= 0 ||
    foldCollarFiniteYMin >= foldCollarAttachmentY
  ) {
    throw new Error(
      "foldCollarFiniteYMin must be positive and smaller than foldCollarAttachmentY"
    );
  }
  const compactRightEndpoint =
    THETA_3_MINUS - foldCollarAttachmentY * foldCollarAttachmentY;
  if (compactRightEndpoint <= I1_RIGHT_ENDPOINT) {
    throw new Error("foldCollarAttachmentY makes the compact right complement empty");
  }
  const speedRatioInterval = [...SPEED_RATIO_ENCLOSURE];
  const complementEnclosures = [
    buildAdaptiveComplementEnclosure({
      complementId: "I1.left-complement.forcing-positive",
      thetaInterval: [I1_CELL_LEFT_ENDPOINT, I1_LEFT_ENDPOINT],
      expectedSign: "+",
      initialThetaCellCount: initialThetaCellCountLeft,
      maxAdaptiveDepth,
      speedRatioInterval,
      rootSubdivisions,
      fDeltaSubdivisionCount,
      complementSubdivisionCount,
    }),
    buildAdaptiveComplementEnclosure({
      complementId: "I1.right-compact-complement.forcing-negative",
      thetaInterval: [I1_RIGHT_ENDPOINT, compactRightEndpoint],
      expectedSign: "-",
      initialThetaCellCount: initialThetaCellCountRight,
      maxAdaptiveDepth,
      speedRatioInterval,
      rootSubdivisions,
      fDeltaSubdivisionCount,
      complementSubdivisionCount,
    }),
  ];
  const compactCertified = complementEnclosures.every(
    (summary) =>
      summary.status ===
      "directed-rounded-compact-complement-sign-enclosure-certified"
  );
  const foldCollarFiniteSlabEnclosure =
    buildAdaptiveFoldCollarFiniteSlabEnclosure({
      yInterval: [foldCollarFiniteYMin, foldCollarAttachmentY],
      expectedGSign: "-",
      expectedDSign: "-",
      initialYCellCount: initialFoldCollarYCellCount,
      maxAdaptiveDepth: foldCollarMaxAdaptiveDepth,
      speedRatioInterval,
      rootSubdivisions,
      fDeltaSubdivisionCount: foldCollarFDeltaSubdivisionCount,
      complementSubdivisionCount: foldCollarComplementSubdivisionCount,
    });
  const foldCollarSpeedSideGuard = buildTheta3minusFixedFoldSideGuard({
    foldCollarFiniteYMin,
  });
  const finiteSlabCertified =
    foldCollarFiniteSlabEnclosure.status ===
      "directed-rounded-fold-collar-finite-y-GD-sign-enclosure-certified" &&
    foldCollarSpeedSideGuard.status ===
      "fixed-fold-finite-collar-speed-side-guard-passed";
  const foldCollarResidual = buildFoldCollarResidual({
    foldCollarAttachmentY,
    foldCollarFiniteYMin,
  });
  const minimumForcingClearance = Math.min(
    ...complementEnclosures.map((summary) =>
      Number(summary.minimum_directed_rounded_forcing_sign_clearance)
    )
  );
  const finiteSlabGClearance = Number(
    foldCollarFiniteSlabEnclosure.minimum_directed_rounded_G_sign_clearance
  );
  const finiteSlabDClearance = Number(
    foldCollarFiniteSlabEnclosure.minimum_directed_rounded_D_sign_clearance
  );
  const minimumTubeEndpointAbsF = Math.min(
    ...complementEnclosures.map((summary) =>
      Number(summary.minimum_directed_rounded_tube_endpoint_interval_abs_F)
    ),
    Number(
      foldCollarFiniteSlabEnclosure
        .minimum_directed_rounded_tube_endpoint_interval_abs_F
    )
  );
  const minimumTubeFDeltaAbs = Math.min(
    ...complementEnclosures.map((summary) =>
      Number(summary.minimum_directed_rounded_tube_interval_F_delta_abs)
    ),
    Number(
      foldCollarFiniteSlabEnclosure
        .minimum_directed_rounded_tube_interval_F_delta_abs
    )
  );
  const minimumComplementAbsF = Math.min(
    ...complementEnclosures.map((summary) =>
      Number(summary.minimum_directed_rounded_complement_interval_abs_F)
    ),
    Number(
      foldCollarFiniteSlabEnclosure
        .minimum_directed_rounded_complement_interval_abs_F
    )
  );
  const openQuantityNames = [
    "theta_3minus_left_fold_collar_near_zero_normal_form",
    "theta_3minus_left_fold_collar_finite_y_interval_slab",
    "I1_regular_critical_exhaustion",
    "global_I1_interval_sign_topology",
    "interval_critical_exhaustion",
    "interval_quadrature_enclosure",
    "retained_branch_status",
  ];
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPACT_COMPLEMENT_DIRECTED_ROUNDED_INTERVAL_ENCLOSURE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.md",
    interval_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      root_subdivisions: rootSubdivisions,
      initial_theta_cell_count_left: initialThetaCellCountLeft,
      initial_theta_cell_count_right: initialThetaCellCountRight,
      max_adaptive_depth: maxAdaptiveDepth,
      source_interval_F_delta_subdivision_count: fDeltaSubdivisionCount,
      source_interval_complement_subdivision_count: complementSubdivisionCount,
      fold_collar_source_interval_F_delta_subdivision_count:
        foldCollarFDeltaSubdivisionCount,
      fold_collar_source_interval_complement_subdivision_count:
        foldCollarComplementSubdivisionCount,
      fold_collar_attachment_y: formatSmallNumber(foldCollarAttachmentY),
      fold_collar_finite_y_min: formatSmallNumber(foldCollarFiniteYMin),
      initial_fold_collar_y_cell_count: initialFoldCollarYCellCount,
      fold_collar_max_adaptive_depth: foldCollarMaxAdaptiveDepth,
      compact_right_complement_interval: [
        formatSmallNumber(I1_RIGHT_ENDPOINT),
        formatSmallNumber(compactRightEndpoint),
      ],
    },
    compact_complement_directed_rounded_enclosures: complementEnclosures,
    fold_collar_fixed_side_speed_guard: foldCollarSpeedSideGuard,
    fold_collar_finite_slab_directed_rounded_enclosure:
      foldCollarFiniteSlabEnclosure,
    fold_collar_radius_residual: foldCollarResidual,
    compact_complement_interval_summary: {
      summary_row_id:
        "I1.compact-complement-and-finite-fold-collar.directed-rounded-sign-enclosures",
      compact_complement_enclosure_count: complementEnclosures.length,
      certified_compact_complement_enclosure_count: complementEnclosures.filter(
        (summary) =>
          summary.status ===
          "directed-rounded-compact-complement-sign-enclosure-certified"
      ).length,
      attempted_tile_count: complementEnclosures.reduce(
        (sum, summary) => sum + summary.attempted_tile_count,
        foldCollarFiniteSlabEnclosure.attempted_tile_count
      ),
      certified_tile_count: complementEnclosures.reduce(
        (sum, summary) => sum + summary.certified_tile_count,
        foldCollarFiniteSlabEnclosure.certified_tile_count
      ),
      open_tile_count: complementEnclosures.reduce(
        (sum, summary) => sum + summary.open_tile_count,
        foldCollarFiniteSlabEnclosure.open_tile_count
      ),
      minimum_directed_rounded_forcing_sign_clearance:
        formatSmallNumber(minimumForcingClearance),
      minimum_directed_rounded_fold_collar_G_sign_clearance:
        formatSmallNumber(finiteSlabGClearance),
      minimum_directed_rounded_fold_collar_D_sign_clearance:
        formatSmallNumber(finiteSlabDClearance),
      minimum_directed_rounded_tube_endpoint_interval_abs_F:
        formatSmallNumber(minimumTubeEndpointAbsF),
      minimum_directed_rounded_tube_interval_F_delta_abs:
        formatSmallNumber(minimumTubeFDeltaAbs),
      minimum_directed_rounded_complement_interval_abs_F:
        formatSmallNumber(minimumComplementAbsF),
      certifies_compact_complement_directed_rounded_interval_enclosures:
        compactCertified,
      certifies_theta_3minus_left_fold_collar_finite_y_GD_interval_slab:
        false,
      finite_fold_collar_interval_attempt_status:
        foldCollarFiniteSlabEnclosure.status,
      requires_theta_3minus_speed_dependent_normal_form: true,
      status: compactCertified
        ? "i1-compact-complement-directed-rounded-interval-enclosures-certified"
        : "i1-compact-complement-directed-rounded-interval-enclosures-open",
    },
    interval_profile_boundary: {
      certifies_I1_compact_complement_directed_rounded_interval_enclosures:
        compactCertified,
      certifies_I1_left_complement_directed_rounded_interval_enclosure:
        complementEnclosures[0].status ===
        "directed-rounded-compact-complement-sign-enclosure-certified",
      certifies_I1_right_compact_complement_directed_rounded_interval_enclosure:
        complementEnclosures[1].status ===
        "directed-rounded-compact-complement-sign-enclosure-certified",
      certifies_theta_3minus_left_fold_collar_finite_y_GD_interval_slab:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_global_I1_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      open_quantity_names: openQuantityNames,
      status:
        compactCertified
          ? "compact-complement-enclosures-certified-speed-dependent-fold-normal-form-open"
          : "compact-complement-enclosures-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_I1_compact_complement_directed_rounded_interval_enclosures:
        compactCertified,
      certifies_I1_left_complement_directed_rounded_interval_enclosure:
        complementEnclosures[0].status ===
        "directed-rounded-compact-complement-sign-enclosure-certified",
      certifies_I1_right_compact_complement_directed_rounded_interval_enclosure:
        complementEnclosures[1].status ===
        "directed-rounded-compact-complement-sign-enclosure-certified",
      certifies_theta_3minus_left_fold_collar_finite_y_GD_interval_slab:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_complement_sign_interval_enclosures: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_global_I1_interval_sign_topology: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      open_quantity_names: openQuantityNames,
      claim_level:
        "Directed-rounded interval sign enclosures for the two compact I1 complements. A fixed-fold finite collar attempt exposes that the theta_3minus fold moves across the certified speed enclosure; the remaining collar must be handled by a speed-dependent fold normal form theta_3minus(v)-y^2 before full I1 complement sign enclosures or I1 regular critical exhaustion can be claimed.",
    },
    result: {
      theory_status: compactCertified
        ? RESULT_THEORY_STATUS
        : "source-atlas-aware-i1-compact-complement-directed-rounded-interval-enclosures-open",
      first_successor_row: SUCCESSOR_ROW,
      residual_subobligation:
        "replace the fixed theta_3minus collar by a speed-dependent normal form theta=theta_3minus(v)-y^2, prove G(y)<0 and D(y)<0 through the collar, then compose compact complement signs, fold-collar signs, and the I1.f1 unique zero into I1 regular critical exhaustion",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The ordinary-theta compact I1 complements have directed-rounded source-root and forcing sign enclosures. The fold-collar gap is now sharpened: a fixed theta_3minus collar is not uniform below the speed-fold crossing threshold, so the successor must use a speed-dependent fold normal form.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPACT_COMPLEMENT_DIRECTED_ROUNDED_INTERVAL_ENCLOSURE_SCHEMA,
    "schema must match I1 compact complement directed-rounded interval enclosure schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 compact complement directed-rounded interval enclosure packet",
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
    "compact complement interval packet must not impose a fixed speed window",
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
    Array.isArray(artifact?.compact_complement_directed_rounded_enclosures) &&
      artifact.compact_complement_directed_rounded_enclosures.length === 2 &&
      artifact.compact_complement_directed_rounded_enclosures.every(
        (summary) =>
          summary.status ===
            "directed-rounded-compact-complement-sign-enclosure-certified" &&
          summary.open_tile_count === 0 &&
          Number(summary.minimum_directed_rounded_forcing_sign_clearance) > 0 &&
          Number(summary.minimum_directed_rounded_tube_endpoint_interval_abs_F) >
            0 &&
          Number(summary.minimum_directed_rounded_tube_interval_F_delta_abs) >
            0 &&
          Number(summary.minimum_directed_rounded_complement_interval_abs_F) >
            0 &&
          summary.certified_tiles.every(
            (tile) =>
              tile.status ===
                "directed-rounded-compact-complement-tile-sign-certified" &&
              tile.directed_rounded_forcing_sign ===
                summary.expected_forcing_sign &&
              Number(tile.directed_rounded_forcing_sign_clearance) > 0
          )
      ),
    "compact complement directed-rounded summaries must certify all compact tiles",
    errors
  );
  assertField(
    artifact?.compact_complement_directed_rounded_enclosures?.[0]
      ?.complement_id === "I1.left-complement.forcing-positive" &&
      artifact?.compact_complement_directed_rounded_enclosures?.[0]
        ?.expected_forcing_sign === "+" &&
      artifact?.compact_complement_directed_rounded_enclosures?.[1]
        ?.complement_id ===
        "I1.right-compact-complement.forcing-negative" &&
      artifact?.compact_complement_directed_rounded_enclosures?.[1]
        ?.expected_forcing_sign === "-",
    "compact complement summaries must name left positive and right compact negative rows",
    errors
  );
  assertField(
    artifact?.fold_collar_radius_residual
      ?.certifies_explicit_interval_fold_collar_radius === false &&
      artifact?.fold_collar_radius_residual?.status ===
        "speed-dependent-fold-normal-form-required",
    "fold-collar residual must require the speed-dependent normal form",
    errors
  );
  assertField(
    artifact?.compact_complement_interval_summary
      ?.certifies_compact_complement_directed_rounded_interval_enclosures ===
      true &&
      artifact?.compact_complement_interval_summary
        ?.certifies_theta_3minus_left_fold_collar_finite_y_GD_interval_slab ===
        false &&
      artifact?.compact_complement_interval_summary
        ?.requires_theta_3minus_speed_dependent_normal_form === true &&
      artifact?.compact_complement_interval_summary?.status ===
        "i1-compact-complement-directed-rounded-interval-enclosures-certified",
    "summary must certify compact complement enclosures and require speed-dependent normal form",
    errors
  );
  assertField(
    artifact?.fold_collar_fixed_side_speed_guard?.status ===
      "fixed-fold-finite-collar-speed-side-guard-passed" &&
      artifact?.fold_collar_fixed_side_speed_guard
        ?.certifies_fixed_collar_stays_left_of_speed_endpoint_fold_sample_enclosure ===
        true &&
      Number(
        artifact?.fold_collar_fixed_side_speed_guard
          ?.left_side_clearance_at_y_min
      ) > 0,
    "finite fold-collar slab must pass the fixed-fold speed-side guard",
    errors
  );
  assertField(
    artifact?.fold_collar_finite_slab_directed_rounded_enclosure?.status ===
      "directed-rounded-fold-collar-finite-y-GD-sign-enclosure-open" &&
      artifact?.fold_collar_finite_slab_directed_rounded_enclosure
        ?.open_tile_count > 0,
    "finite fold-collar slab attempt must remain open rather than overclaiming",
    errors
  );
  assertField(
    artifact?.interval_profile_boundary
      ?.certifies_I1_compact_complement_directed_rounded_interval_enclosures ===
      true &&
      artifact?.interval_profile_boundary
        ?.certifies_theta_3minus_left_fold_collar_finite_y_GD_interval_slab ===
        false &&
      artifact?.interval_profile_boundary
        ?.certifies_theta_3minus_left_fold_collar_interval_radius === false &&
      artifact?.interval_profile_boundary
        ?.certifies_I1_complement_sign_interval_enclosures === false &&
      artifact?.interval_profile_boundary
        ?.certifies_I1_regular_critical_exhaustion === false &&
      artifact?.interval_profile_boundary?.retained_branch === false,
    "interval boundary must keep fold collar, full I1 complement signs, critical exhaustion, and retention open",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_I1_compact_complement_directed_rounded_interval_enclosures ===
      true &&
      artifact?.artifact_claim
        ?.certifies_theta_3minus_left_fold_collar_finite_y_GD_interval_slab ===
        false &&
      artifact?.artifact_claim
        ?.certifies_theta_3minus_left_fold_collar_interval_radius === false &&
      artifact?.artifact_claim?.certifies_I1_complement_sign_interval_enclosures ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must certify only compact complement intervals while keeping fold/full/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status === RESULT_THEORY_STATUS &&
      artifact?.result?.first_successor_row === SUCCESSOR_ROW &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must advance to the near-zero normal form successor without retaining the branch",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.mjs [options]",
    "",
    "Options:",
    "  --out <path>                         Write artifact JSON to path",
    "  --validate <path>                    Validate an existing artifact JSON file",
    "  --print-schema                       Print the artifact schema",
    "  --pretty                             Pretty-print JSON",
    "  --subdivisions <n>                   Source root subdivisions (default: 5000)",
    "  --left-cells <n>                     Initial left complement theta cells (default: 4)",
    "  --right-cells <n>                    Initial right compact complement theta cells (default: 24)",
    "  --max-depth <n>                      Maximum adaptive bisection depth (default: 9)",
    "  --f-delta-subdivisions <n>           F_delta interval subdivisions (default: 32)",
    "  --complement-subdivisions <n>        Complement slab interval subdivisions (default: 192)",
    "  --fold-collar-y <x>                  Right complement attachment y (default: 0.115)",
    "  --fold-collar-y-min <x>              Fixed-fold finite collar probe lower y (default: 0.003)",
    "  --fold-collar-y-cells <n>            Fixed-fold finite collar probe cells (default: 4)",
    "  --fold-collar-max-depth <n>          Fixed-fold finite collar probe adaptive depth (default: 0)",
    "  --help                               Show this help",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    outPath: null,
    validatePath: null,
    pretty: false,
    printSchema: false,
    help: false,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    initialThetaCellCountLeft: DEFAULT_INITIAL_THETA_CELL_COUNT_LEFT,
    initialThetaCellCountRight: DEFAULT_INITIAL_THETA_CELL_COUNT_RIGHT,
    maxAdaptiveDepth: DEFAULT_MAX_ADAPTIVE_DEPTH,
    fDeltaSubdivisionCount: DEFAULT_SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS,
    complementSubdivisionCount: DEFAULT_SOURCE_INTERVAL_COMPLEMENT_SUBDIVISIONS,
    foldCollarAttachmentY: DEFAULT_FOLD_COLLAR_ATTACHMENT_Y,
    foldCollarFiniteYMin: DEFAULT_FOLD_COLLAR_FINITE_Y_MIN,
    initialFoldCollarYCellCount: DEFAULT_INITIAL_FOLD_COLLAR_Y_CELL_COUNT,
    foldCollarMaxAdaptiveDepth: DEFAULT_FOLD_COLLAR_MAX_ADAPTIVE_DEPTH,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--print-schema" || arg === "--schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--left-cells") {
      args.initialThetaCellCountLeft = Number.parseInt(argv[++index], 10);
    } else if (arg === "--right-cells") {
      args.initialThetaCellCountRight = Number.parseInt(argv[++index], 10);
    } else if (arg === "--max-depth") {
      args.maxAdaptiveDepth = Number.parseInt(argv[++index], 10);
    } else if (arg === "--f-delta-subdivisions") {
      args.fDeltaSubdivisionCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--complement-subdivisions") {
      args.complementSubdivisionCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--fold-collar-y") {
      args.foldCollarAttachmentY = Number(argv[++index]);
    } else if (arg === "--fold-collar-y-min") {
      args.foldCollarFiniteYMin = Number(argv[++index]);
    } else if (arg === "--fold-collar-y-cells") {
      args.initialFoldCollarYCellCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--fold-collar-max-depth") {
      args.foldCollarMaxAdaptiveDepth = Number.parseInt(argv[++index], 10);
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument ${arg}`);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (args.printSchema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPACT_COMPLEMENT_DIRECTED_ROUNDED_INTERVAL_ENCLOSURE_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure(
        artifact
      );
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log("ok");
    }
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure(
      {
        rootSubdivisions: args.rootSubdivisions,
        initialThetaCellCountLeft: args.initialThetaCellCountLeft,
        initialThetaCellCountRight: args.initialThetaCellCountRight,
        maxAdaptiveDepth: args.maxAdaptiveDepth,
        fDeltaSubdivisionCount: args.fDeltaSubdivisionCount,
        complementSubdivisionCount: args.complementSubdivisionCount,
        foldCollarAttachmentY: args.foldCollarAttachmentY,
        foldCollarFiniteYMin: args.foldCollarFiniteYMin,
        initialFoldCollarYCellCount: args.initialFoldCollarYCellCount,
        foldCollarMaxAdaptiveDepth: args.foldCollarMaxAdaptiveDepth,
      }
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure(
      artifact
    );
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.outPath) {
    fs.mkdirSync(path.dirname(args.outPath), { recursive: true });
    fs.writeFileSync(args.outPath, `${json}\n`);
  } else {
    console.log(json);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
