#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledRootTubeCellCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_COMPLEMENT_SLAB_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_regular_root_complement_slab_certificate";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const DEFAULT_DELTA_SUBCELL_WIDTH = 0.002;
const DEFAULT_FOLD_P_SUBCELL_WIDTH = 0.01;
const DEFAULT_FOLD_P_NEIGHBORHOOD_RADIUS = 8;
const DEFAULT_FOLD_PAIR_ROOT_PADDING = 0.00005;
const DEFAULT_FOLD_P_ROOT_PADDING = 0.001;
const MAX_TAYLOR_ARGUMENT = 1;
const ROOT_DOMAIN_MIN = 0;
const ROOT_DOMAIN_MAX_BUFFER_FACTOR = 1e-8;
const TERM_ROWS = [
  {
    term_label: "s_{+,+}(u)",
    kappa: 1,
    regular_sheet_ids: ["spp_u_regular_0"],
    fold_pair: false,
  },
  {
    term_label: "-s_{+,+}(u+Q)",
    kappa: 1,
    regular_sheet_ids: ["minus_spp_u_plus_Q_regular_outer"],
    fold_pair: true,
  },
  {
    term_label: "s_{-,+}(u)",
    kappa: -1,
    regular_sheet_ids: ["smp_u_regular_0"],
    fold_pair: false,
  },
  {
    term_label: "-s_{-,+}(u+Q)",
    kappa: -1,
    regular_sheet_ids: ["minus_smp_u_plus_Q_regular_0"],
    fold_pair: false,
  },
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

function positivePowerInterval(interval, exponent) {
  let product = [1, 1];
  for (let index = 0; index < exponent; index += 1) {
    product = multiplyIntervals(product, interval);
  }
  return product;
}

function intervalHull(values, pad = 0) {
  return outwardInterval([
    Math.min(...values) - pad,
    Math.max(...values) + pad,
  ]);
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

function intervalAbsUpper([left, right]) {
  return Math.max(Math.abs(left), Math.abs(right));
}

function inverseSpeedSquaredInterval(speedRatioInterval) {
  return outwardInterval([
    1 / (speedRatioInterval[1] * speedRatioInterval[1]),
    1 / (speedRatioInterval[0] * speedRatioInterval[0]),
  ]);
}

function sourcePhiInterval({ thetaTildeInterval, deltaInterval }) {
  return subtractIntervals(scaleInterval(thetaTildeInterval, 2), deltaInterval);
}

function sourceEquationInterval({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  deltaInterval,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return addIntervals(
    multiplyIntervals(
      positivePowerInterval(deltaInterval, 2),
      inverseSpeedSquaredInterval(speedRatioInterval)
    ),
    [-2, -2],
    sinInterval(phiInterval),
    scaleInterval(sinInterval(deltaInterval), kappa)
  );
}

function sourceDeltaDerivativeInterval({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  deltaInterval,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  return addIntervals(
    multiplyIntervals(scaleInterval(deltaInterval, 2), inverseSpeedSquaredInterval(speedRatioInterval)),
    scaleInterval(cosInterval(phiInterval), -1),
    scaleInterval(cosInterval(deltaInterval), kappa)
  );
}

function sourceEquationPoint({ speedRatio, kappa, thetaTilde, delta }) {
  return (
    (delta * delta) / (speedRatio * speedRatio) -
    2 +
    Math.sin(2 * thetaTilde - delta) +
    kappa * Math.sin(delta)
  );
}

function midpoint([left, right]) {
  return 0.5 * (left + right);
}

function halfWidth([left, right]) {
  return 0.5 * Math.max(0, right - left);
}

function sourceEquationCenteredInterval({
  speedRatioInterval,
  kappa,
  thetaTildeInterval,
  deltaInterval,
}) {
  const speedCenter = midpoint(speedRatioInterval);
  const thetaCenter = midpoint(thetaTildeInterval);
  const deltaCenter = midpoint(deltaInterval);
  const centerValue = sourceEquationPoint({
    speedRatio: speedCenter,
    kappa,
    thetaTilde: thetaCenter,
    delta: deltaCenter,
  });
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  const FDeltaInterval = sourceDeltaDerivativeInterval({
    speedRatioInterval,
    kappa,
    thetaTildeInterval,
    deltaInterval,
  });
  const FThetaInterval = scaleInterval(cosInterval(phiInterval), 2);
  const maxDelta = Math.max(Math.abs(deltaInterval[0]), Math.abs(deltaInterval[1]));
  const minSpeed = Math.min(Math.abs(speedRatioInterval[0]), Math.abs(speedRatioInterval[1]));
  const FSpeedAbsUpper = (2 * maxDelta * maxDelta) / (minSpeed * minSpeed * minSpeed);
  const radius =
    intervalAbsUpper(FDeltaInterval) * halfWidth(deltaInterval) +
    intervalAbsUpper(FThetaInterval) * halfWidth(thetaTildeInterval) +
    FSpeedAbsUpper * halfWidth(speedRatioInterval);
  return outwardInterval([centerValue - radius, centerValue + radius]);
}

function stableS3Interval(argumentInterval) {
  const maxAbs = intervalAbsUpper(argumentInterval);
  if (maxAbs > MAX_TAYLOR_ARGUMENT) {
    throw new Error("S3 Taylor interval is only configured for |t| <= 1");
  }
  const upper = -1 / 6 + (maxAbs * maxAbs) / 120 + maxAbs ** 6 / 362880;
  return outwardInterval([-1 / 6, upper]);
}

function stableC4Interval(argumentInterval) {
  const maxAbs = intervalAbsUpper(argumentInterval);
  if (maxAbs > MAX_TAYLOR_ARGUMENT) {
    throw new Error("C4 Taylor interval is only configured for |t| <= 1");
  }
  const lower =
    1 / 24 - (maxAbs * maxAbs) / 720 - maxAbs ** 6 / 3628800;
  return outwardInterval([lower, 1 / 24]);
}

function stableSincInterval(argumentInterval) {
  const maxAbs = intervalAbsUpper(argumentInterval);
  if (maxAbs > MAX_TAYLOR_ARGUMENT) {
    throw new Error("sinc Taylor interval is only configured for |t| <= 1");
  }
  const lower =
    1 - (maxAbs * maxAbs) / 6 + maxAbs ** 4 / 120 - maxAbs ** 6 / 5040;
  return outwardInterval([lower, 1]);
}

function stableOneMinusCosOverSquareInterval(argumentInterval) {
  const maxAbs = intervalAbsUpper(argumentInterval);
  if (maxAbs > MAX_TAYLOR_ARGUMENT) {
    throw new Error("(1-cos(t))/t^2 interval is only configured for |t| <= 1");
  }
  const lower =
    1 / 2 - (maxAbs * maxAbs) / 24 + maxAbs ** 4 / 720 - maxAbs ** 6 / 40320;
  return outwardInterval([lower, 1 / 2]);
}

function scaledFoldPInterval({ foldCell, yInterval, pInterval }) {
  const p = pInterval;
  const q = addIntervals(p, scaleInterval(yInterval, 2));
  const yq = multiplyIntervals(yInterval, q);
  const yr = multiplyIntervals(yInterval, p);
  const A = numericInterval(foldCell.A_interval);
  const beta = numericInterval(foldCell.beta_interval);
  const phiFoldInterval = numericInterval(foldCell.phi_fold_interval);
  const deltaFoldInterval = numericInterval(foldCell.delta_fold_interval);
  const sinPhi = sinInterval(phiFoldInterval);
  const cosPhi = cosInterval(phiFoldInterval);
  const sinDelta = sinInterval(deltaFoldInterval);
  const cosDelta = cosInterval(deltaFoldInterval);
  return addIntervals(
    multiplyIntervals(
      A,
      subtractIntervals(
        positivePowerInterval(p, 2),
        positivePowerInterval(beta, 2)
      )
    ),
    scaleInterval(multiplyIntervals(sinPhi, yInterval, p), -2),
    scaleInterval(multiplyIntervals(sinPhi, positivePowerInterval(yInterval, 2)), -2),
    multiplyIntervals(
      positivePowerInterval(yInterval, 2),
      addIntervals(
        multiplyIntervals(sinPhi, positivePowerInterval(q, 4), stableC4Interval(yq)),
        multiplyIntervals(sinDelta, positivePowerInterval(p, 4), stableC4Interval(yr))
      )
    ),
    multiplyIntervals(
      yInterval,
      addIntervals(
        scaleInterval(
          multiplyIntervals(cosPhi, positivePowerInterval(q, 3), stableS3Interval(yq)),
          -1
        ),
        multiplyIntervals(cosDelta, positivePowerInterval(p, 3), stableS3Interval(yr))
      )
    )
  );
}

function scaledFoldPDerivativePInterval({ foldCell, yInterval, pInterval }) {
  const p = pInterval;
  const q = addIntervals(p, scaleInterval(yInterval, 2));
  const yq = multiplyIntervals(yInterval, q);
  const yp = multiplyIntervals(yInterval, p);
  const inverseSpeedSquared = inverseSpeedSquaredInterval(
    numericInterval(foldCell.speed_interval)
  );
  const phiFoldInterval = numericInterval(foldCell.phi_fold_interval);
  const deltaFoldInterval = numericInterval(foldCell.delta_fold_interval);
  const sinPhi = sinInterval(phiFoldInterval);
  const cosPhi = cosInterval(phiFoldInterval);
  const sinDelta = sinInterval(deltaFoldInterval);
  const cosDelta = cosInterval(deltaFoldInterval);
  return addIntervals(
    multiplyIntervals(scaleInterval(p, 2), inverseSpeedSquared),
    multiplyIntervals(
      cosPhi,
      yInterval,
      positivePowerInterval(q, 2),
      stableOneMinusCosOverSquareInterval(yq)
    ),
    scaleInterval(
      multiplyIntervals(sinPhi, q, stableSincInterval(yq)),
      -1
    ),
    scaleInterval(
      multiplyIntervals(
        cosDelta,
        yInterval,
        positivePowerInterval(p, 2),
        stableOneMinusCosOverSquareInterval(yp)
      ),
      -1
    ),
    scaleInterval(
      multiplyIntervals(sinDelta, p, stableSincInterval(yp)),
      -1
    )
  );
}

function scaledFoldPCenteredPInterval({ foldCell, yInterval, pInterval }) {
  const pCenter = midpoint(pInterval);
  const pCenterInterval = outwardInterval([pCenter, pCenter]);
  const centerInterval = scaledFoldPInterval({
    foldCell,
    yInterval,
    pInterval: pCenterInterval,
  });
  const derivativeInterval = scaledFoldPDerivativePInterval({
    foldCell,
    yInterval,
    pInterval,
  });
  const radius = intervalAbsUpper(derivativeInterval) * halfWidth(pInterval);
  return outwardInterval([centerInterval[0] - radius, centerInterval[1] + radius]);
}

function expandInterval(interval, padding) {
  return outwardInterval([interval[0] - padding, interval[1] + padding]);
}

function numericInterval(interval) {
  return outwardInterval(interval.map(Number));
}

function clampedNonnegativeInterval(interval) {
  return outwardInterval([Math.max(0, interval[0]), Math.max(0, interval[1])]);
}

function branchSign(branch) {
  return branch === "-" ? -1 : 1;
}

function branchPInterval({ foldRow, branchRow, padding }) {
  const yInterval = clampedNonnegativeInterval(numericInterval(foldRow.y_interval));
  const betaInterval = numericInterval(foldRow.beta_interval);
  const zInterval = numericInterval(branchRow.z_tube);
  return expandInterval(
    addIntervals(
      scaleInterval(betaInterval, branchSign(branchRow.branch)),
      multiplyIntervals(yInterval, zInterval)
    ),
    padding
  );
}

function foldPairDeltaInterval({ foldRow, branchRow, padding }) {
  const yInterval = clampedNonnegativeInterval(numericInterval(foldRow.y_interval));
  const deltaFoldInterval = numericInterval(foldRow.delta_fold_interval);
  const betaInterval = numericInterval(foldRow.beta_interval);
  const zInterval = numericInterval(branchRow.z_tube);
  const signedLinear = scaleInterval(
    multiplyIntervals(betaInterval, yInterval),
    branchSign(branchRow.branch)
  );
  const quadratic = multiplyIntervals(
    positivePowerInterval(yInterval, 2),
    zInterval
  );
  return expandInterval(
    addIntervals(deltaFoldInterval, signedLinear, quadratic),
    padding
  );
}

function foldNeighborhoodDeltaInterval({ foldRow, pDomain }) {
  const yInterval = clampedNonnegativeInterval(numericInterval(foldRow.y_interval));
  return addIntervals(
    numericInterval(foldRow.delta_fold_interval),
    multiplyIntervals(yInterval, pDomain)
  );
}

function rootDomainUpper(speedInterval) {
  const speedUpper = speedInterval[1];
  return nextUp(2 * speedUpper + ROOT_DOMAIN_MAX_BUFFER_FACTOR * speedUpper);
}

function clampIntervalToDomain(interval, domain) {
  return outwardInterval([
    Math.max(domain[0], interval[0]),
    Math.min(domain[1], interval[1]),
  ]);
}

function mergeProtectedIntervals(intervals, domain) {
  const sorted = intervals
    .map((interval) => clampIntervalToDomain(interval, domain))
    .filter((interval) => interval[0] <= interval[1])
    .sort((left, right) => left[0] - right[0]);
  const merged = [];
  for (const interval of sorted) {
    const previous = merged[merged.length - 1];
    if (!previous || interval[0] > previous[1]) {
      merged.push([...interval]);
    } else {
      previous[1] = Math.max(previous[1], interval[1]);
    }
  }
  return merged.map(outwardInterval);
}

function complementSlabs({ protectedIntervals, domain }) {
  const slabs = [];
  let cursor = domain[0];
  for (const interval of protectedIntervals) {
    if (interval[0] > cursor) {
      slabs.push(outwardInterval([cursor, interval[0]]));
    }
    cursor = Math.max(cursor, interval[1]);
  }
  if (cursor < domain[1]) {
    slabs.push(outwardInterval([cursor, domain[1]]));
  }
  return slabs.filter((slab) => slab[1] - slab[0] > 0);
}

function certifyComplementSlab({
  slab,
  speedRatioInterval,
  thetaTildeInterval,
  kappa,
  deltaSubcellWidth,
}) {
  const width = slab[1] - slab[0];
  const subcellCount = Math.max(1, Math.ceil(width / deltaSubcellWidth));
  let minClearance = Infinity;
  let maxSubcellWidth = 0;
  const signs = new Set();
  let firstFailure = null;
  for (let index = 0; index < subcellCount; index += 1) {
    const left = slab[0] + (width * index) / subcellCount;
    const right = slab[0] + (width * (index + 1)) / subcellCount;
    const deltaInterval = outwardInterval([left, right]);
    const FInterval = sourceEquationInterval({
      speedRatioInterval,
      kappa,
      thetaTildeInterval,
      deltaInterval,
    });
    const centeredFInterval = sourceEquationCenteredInterval({
      speedRatioInterval,
      kappa,
      thetaTildeInterval,
      deltaInterval,
    });
    const naturalSign = intervalSignAndClearance(FInterval);
    const centeredSign = intervalSignAndClearance(centeredFInterval);
    const sign =
      centeredSign.clearance >= naturalSign.clearance ? centeredSign : naturalSign;
    const certifiedInterval =
      centeredSign.clearance >= naturalSign.clearance
        ? centeredFInterval
        : FInterval;
    maxSubcellWidth = Math.max(maxSubcellWidth, right - left);
    minClearance = Math.min(minClearance, sign.clearance);
    signs.add(sign.sign);
    if (sign.sign === "mixed" && !firstFailure) {
      firstFailure = {
        subcell_index: index,
        delta_interval: formatInterval(deltaInterval),
        F_interval: formatInterval(certifiedInterval),
        natural_F_interval: formatInterval(FInterval),
        centered_F_interval: formatInterval(centeredFInterval),
      };
    }
  }
  const certified =
    signs.size === 1 && !signs.has("mixed") && Number.isFinite(minClearance);
  return {
    slab_status: certified ? "certified-source-equation-sign" : "open",
    slab_interval: formatInterval(slab),
    subcell_count: subcellCount,
    sign: signs.size === 1 ? [...signs][0] : "sign-varying",
    min_F_clearance: formatSmallNumber(minClearance),
    max_delta_subcell_width: formatSmallNumber(maxSubcellWidth),
    slab_certified: certified,
    first_failure: firstFailure,
  };
}

function certifyScaledFoldPSlab({
  slab,
  foldCell,
  yInterval,
  foldPSubcellWidth,
}) {
  const width = slab[1] - slab[0];
  const subcellCount = Math.max(1, Math.ceil(width / foldPSubcellWidth));
  let minClearance = Infinity;
  let maxSubcellWidth = 0;
  let maxTaylorArgument = 0;
  const signs = new Set();
  let firstFailure = null;
  for (let index = 0; index < subcellCount; index += 1) {
    const left = slab[0] + (width * index) / subcellCount;
    const right = slab[0] + (width * (index + 1)) / subcellCount;
    const pInterval = outwardInterval([left, right]);
    const qInterval = addIntervals(pInterval, scaleInterval(yInterval, 2));
    const yq = multiplyIntervals(yInterval, qInterval);
    const yp = multiplyIntervals(yInterval, pInterval);
    const localTaylorArgument = Math.max(
      intervalAbsUpper(yq),
      intervalAbsUpper(yp)
    );
    const naturalScaledFInterval = scaledFoldPInterval({
      foldCell,
      yInterval,
      pInterval,
    });
    const centeredScaledFInterval = scaledFoldPCenteredPInterval({
      foldCell,
      yInterval,
      pInterval,
    });
    const naturalSign = intervalSignAndClearance(naturalScaledFInterval);
    const centeredSign = intervalSignAndClearance(centeredScaledFInterval);
    const sign =
      centeredSign.clearance >= naturalSign.clearance ? centeredSign : naturalSign;
    const certifiedInterval =
      centeredSign.clearance >= naturalSign.clearance
        ? centeredScaledFInterval
        : naturalScaledFInterval;
    maxTaylorArgument = Math.max(maxTaylorArgument, localTaylorArgument);
    maxSubcellWidth = Math.max(maxSubcellWidth, right - left);
    minClearance = Math.min(minClearance, sign.clearance);
    signs.add(sign.sign);
    if (sign.sign === "mixed" && !firstFailure) {
      firstFailure = {
        subcell_index: index,
        p_interval: formatInterval(pInterval),
        F_over_y2_interval: formatInterval(certifiedInterval),
        natural_F_over_y2_interval: formatInterval(naturalScaledFInterval),
        centered_F_over_y2_interval: formatInterval(centeredScaledFInterval),
        max_abs_taylor_argument: formatSmallNumber(localTaylorArgument),
      };
    }
  }
  const certified =
    signs.size === 1 && !signs.has("mixed") && Number.isFinite(minClearance);
  return {
    slab_status: certified ? "certified-scaled-fold-p-sign" : "open",
    slab_interval: formatInterval(slab),
    subcell_count: subcellCount,
    sign: signs.size === 1 ? [...signs][0] : "sign-varying",
    min_F_over_y2_clearance: formatSmallNumber(minClearance),
    max_fold_p_subcell_width: formatSmallNumber(maxSubcellWidth),
    max_abs_taylor_argument: formatSmallNumber(maxTaylorArgument),
    slab_certified: certified,
    first_failure: firstFailure,
  };
}

function termThetaTildeInterval({ regularRow, term }) {
  if (regularRow) {
    return numericInterval(regularRow.theta_tilde_interval);
  }
  throw new Error(`missing theta-tilde interval for ${term.term_label}`);
}

function rawProtectedIntervalsForTerm({ term, regularRows, foldRow, foldPDomain }) {
  const intervals = [];
  for (const sheetId of term.regular_sheet_ids) {
    const row = regularRows.find((candidate) => candidate.sheet_id === sheetId);
    if (!row) {
      throw new Error(`missing regular sheet row ${sheetId}`);
    }
    intervals.push(numericInterval(row.delta_interval));
  }
  if (term.fold_pair) {
    intervals.push(foldNeighborhoodDeltaInterval({ foldRow, pDomain: foldPDomain }));
  }
  return intervals;
}

function certifyFoldNeighborhood({
  foldCell,
  foldPRootPadding,
  foldPSubcellWidth,
  foldPNeighborhoodRadius,
}) {
  const pDomain = outwardInterval([
    -foldPNeighborhoodRadius,
    foldPNeighborhoodRadius,
  ]);
  const yInterval = clampedNonnegativeInterval(numericInterval(foldCell.y_interval));
  const protectedPIntervals = mergeProtectedIntervals(
    foldCell.branch_cell_rows.map((branchRow) =>
      branchPInterval({ foldRow: foldCell, branchRow, padding: foldPRootPadding })
    ),
    pDomain
  );
  const pSlabs = complementSlabs({
    protectedIntervals: protectedPIntervals,
    domain: pDomain,
  });
  const slabRows = pSlabs.map((slab) =>
    certifyScaledFoldPSlab({
      slab,
      foldCell,
      yInterval,
      foldPSubcellWidth,
    })
  );
  return {
    chart: "fold-p",
    p_domain: formatInterval(pDomain),
    protected_fold_p_interval_count: protectedPIntervals.length,
    protected_fold_p_intervals: protectedPIntervals.map(formatInterval),
    scaled_fold_p_slab_count: slabRows.length,
    scaled_fold_p_slab_rows: slabRows,
    scaled_fold_p_subcell_count: slabRows.reduce(
      (sum, row) => sum + row.subcell_count,
      0
    ),
    all_scaled_fold_p_slabs_certified: slabRows.every(
      (row) => row.slab_certified
    ),
  };
}

function buildTermSlabRows({
  regularCell,
  foldCell,
  deltaSubcellWidth,
  foldPadding,
  foldPRootPadding,
  foldPSubcellWidth,
  foldPNeighborhoodRadius,
}) {
  const speedRatioInterval = numericInterval(regularCell.speed_interval);
  const domain = outwardInterval([
    ROOT_DOMAIN_MIN,
    rootDomainUpper(speedRatioInterval),
  ]);
  return TERM_ROWS.map((term) => {
    const regularRows = regularCell.regular_sheet_rows.filter(
      (row) => row.term_label === term.term_label
    );
    const representativeRegularRow = regularRows[0];
    const thetaTildeInterval = termThetaTildeInterval({
      regularRow: representativeRegularRow,
      term,
    });
    const foldPDomain = outwardInterval([
      -foldPNeighborhoodRadius,
      foldPNeighborhoodRadius,
    ]);
    const protectedIntervals = mergeProtectedIntervals(
      rawProtectedIntervalsForTerm({
        term,
        regularRows: regularCell.regular_sheet_rows,
        foldRow: foldCell,
        foldPDomain,
      }),
      domain
    );
    const slabs = complementSlabs({ protectedIntervals, domain });
    const slabRows = slabs.map((slab) =>
      certifyComplementSlab({
        slab,
        speedRatioInterval,
        thetaTildeInterval,
        kappa: term.kappa,
        deltaSubcellWidth,
      })
    );
    const foldNeighborhoodScaledPRow = term.fold_pair
      ? certifyFoldNeighborhood({
          foldCell,
          foldPRootPadding,
          foldPSubcellWidth,
          foldPNeighborhoodRadius,
        })
      : null;
    return {
      term_label: term.term_label,
      kappa: term.kappa,
      theta_tilde_interval: formatInterval(thetaTildeInterval),
      root_domain: formatInterval(domain),
      protected_root_interval_count: protectedIntervals.length,
      protected_root_intervals: protectedIntervals.map(formatInterval),
      raw_source_complement_slab_count: slabRows.length,
      scaled_fold_p_slab_count:
        foldNeighborhoodScaledPRow?.scaled_fold_p_slab_count ?? 0,
      complement_slab_count:
        slabRows.length +
        (foldNeighborhoodScaledPRow?.scaled_fold_p_slab_count ?? 0),
      attempted_raw_source_complement_slab_count: slabRows.length,
      deferred_fold_neighborhood_slab_count: 0,
      complement_slab_rows: slabRows,
      fold_neighborhood_scaled_p_row: foldNeighborhoodScaledPRow,
      term_complement_certified:
        slabRows.every((row) => row.slab_certified) &&
        (foldNeighborhoodScaledPRow?.all_scaled_fold_p_slabs_certified ?? true),
    };
  });
}

function buildCellRow({
  regularCell,
  foldCell,
  deltaSubcellWidth,
  foldPadding,
  foldPRootPadding,
  foldPSubcellWidth,
  foldPNeighborhoodRadius,
}) {
  const termRows = buildTermSlabRows({
    regularCell,
    foldCell,
    deltaSubcellWidth,
    foldPadding,
    foldPRootPadding,
    foldPSubcellWidth,
    foldPNeighborhoodRadius,
  });
  return {
    cell_id: regularCell.cell_id,
    speed_interval: regularCell.speed_interval,
    y_interval: regularCell.y_interval,
    theta_interval: regularCell.theta_interval,
    delta_subcell_width: formatSmallNumber(deltaSubcellWidth),
    fold_p_subcell_width: formatSmallNumber(foldPSubcellWidth),
    fold_p_neighborhood_radius: formatSmallNumber(foldPNeighborhoodRadius),
    fold_pair_root_padding: formatSmallNumber(foldPadding),
    fold_p_root_padding: formatSmallNumber(foldPRootPadding),
    term_complement_slab_rows: termRows,
    all_term_complements_certified: termRows.every(
      (row) => row.term_complement_certified
    ),
  };
}

function summarizeRows({ rows, regularPredecessor, foldPairPredecessor }) {
  const termRows = rows.flatMap((row) => row.term_complement_slab_rows);
  const rawSlabRows = termRows.flatMap((row) => row.complement_slab_rows);
  const scaledPRows = termRows.flatMap(
    (row) => row.fold_neighborhood_scaled_p_row?.scaled_fold_p_slab_rows ?? []
  );
  const protectedRootCount = termRows.reduce(
    (sum, row) => sum + row.protected_root_interval_count,
    0
  );
  const protectedFoldPCount = termRows.reduce(
    (sum, row) =>
      sum +
      (row.fold_neighborhood_scaled_p_row?.protected_fold_p_interval_count ?? 0),
    0
  );
  const minRawClearance = Math.min(
    ...rawSlabRows.map((row) => Number(row.min_F_clearance))
  );
  const maxDeltaSubcellWidth = Math.max(
    ...rawSlabRows.map((row) => Number(row.max_delta_subcell_width))
  );
  const rawSubcellCount = rawSlabRows.reduce(
    (sum, row) => sum + Number(row.subcell_count),
    0
  );
  const minScaledPClearance =
    scaledPRows.length > 0
      ? Math.min(...scaledPRows.map((row) => Number(row.min_F_over_y2_clearance)))
      : Infinity;
  const maxFoldPSubcellWidth =
    scaledPRows.length > 0
      ? Math.max(...scaledPRows.map((row) => Number(row.max_fold_p_subcell_width)))
      : 0;
  const maxTaylorArgument =
    scaledPRows.length > 0
      ? Math.max(...scaledPRows.map((row) => Number(row.max_abs_taylor_argument)))
      : 0;
  const scaledPSubcellCount = scaledPRows.reduce(
    (sum, row) => sum + Number(row.subcell_count),
    0
  );
  const allRawCertified = rawSlabRows.every(
    (row) => row.slab_certified
  );
  const allScaledPCertified = scaledPRows.every((row) => row.slab_certified);
  const predecessorPassed =
    regularPredecessor.artifact_claim
      .certifies_directed_rounded_regular_root_sheet_quotient_cell_cover ===
      true &&
    foldPairPredecessor.artifact_claim
      .certifies_directed_rounded_fold_pair_scaled_root_tube_cell_cover ===
      true;
  const passed =
    allRawCertified &&
    allScaledPCertified &&
    predecessorPassed &&
    minRawClearance > 0 &&
    minScaledPClearance > 0;
  return {
    speed_cell_count: new Set(rows.map((row) => row.speed_interval.join(","))).size,
    y_cell_count: new Set(rows.map((row) => row.y_interval.join(","))).size,
    cell_count: rows.length,
    term_cell_count: termRows.length,
    protected_root_interval_count: protectedRootCount,
    protected_fold_p_interval_count: protectedFoldPCount,
    complement_slab_count: rawSlabRows.length + scaledPRows.length,
    attempted_raw_source_complement_slab_count: rawSlabRows.length,
    scaled_fold_p_slab_count: scaledPRows.length,
    deferred_fold_neighborhood_slab_count: 0,
    complement_delta_subcell_count: rawSubcellCount,
    scaled_fold_p_subcell_count: scaledPSubcellCount,
    all_attempted_raw_source_complement_slabs_certified: allRawCertified,
    all_scaled_fold_p_slabs_certified: allScaledPCertified,
    all_complement_slabs_certified: passed,
    predecessor_sheet_quotient_cover_certified:
      regularPredecessor.artifact_claim
        .certifies_directed_rounded_regular_root_sheet_quotient_cell_cover,
    predecessor_fold_pair_root_tube_cover_certified:
      foldPairPredecessor.artifact_claim
        .certifies_directed_rounded_fold_pair_scaled_root_tube_cell_cover,
    min_complement_F_clearance: formatSmallNumber(minRawClearance),
    min_scaled_fold_p_F_over_y2_clearance: formatSmallNumber(minScaledPClearance),
    max_delta_subcell_width: formatSmallNumber(maxDeltaSubcellWidth),
    max_fold_p_subcell_width: formatSmallNumber(maxFoldPSubcellWidth),
    max_fold_p_taylor_argument: formatSmallNumber(maxTaylorArgument),
    status: passed
      ? "directed-rounded-theta3minus-regular-root-complement-slab-exclusion-certified"
      : "theta3minus-regular-root-complement-slab-exclusion-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate(
  options = {}
) {
  const deltaSubcellWidth = Number(
    options.deltaSubcellWidth ?? DEFAULT_DELTA_SUBCELL_WIDTH
  );
  const foldPadding = Number(
    options.foldPairRootPadding ?? DEFAULT_FOLD_PAIR_ROOT_PADDING
  );
  const foldPRootPadding = Number(
    options.foldPRootPadding ?? DEFAULT_FOLD_P_ROOT_PADDING
  );
  const foldPSubcellWidth = Number(
    options.foldPSubcellWidth ?? DEFAULT_FOLD_P_SUBCELL_WIDTH
  );
  const foldPNeighborhoodRadius = Number(
    options.foldPNeighborhoodRadius ?? DEFAULT_FOLD_P_NEIGHBORHOOD_RADIUS
  );
  if (
    !Number.isFinite(deltaSubcellWidth) ||
    deltaSubcellWidth <= 0 ||
    deltaSubcellWidth > 0.05
  ) {
    throw new Error("deltaSubcellWidth must be finite, positive, and <= 0.05");
  }
  if (!Number.isFinite(foldPadding) || foldPadding < 0 || foldPadding > 0.001) {
    throw new Error("foldPairRootPadding must be finite and in [0,0.001]");
  }
  if (
    !Number.isFinite(foldPRootPadding) ||
    foldPRootPadding < 0 ||
    foldPRootPadding > 0.01
  ) {
    throw new Error("foldPRootPadding must be finite and in [0,0.01]");
  }
  if (
    !Number.isFinite(foldPSubcellWidth) ||
    foldPSubcellWidth <= 0 ||
    foldPSubcellWidth > 0.05
  ) {
    throw new Error("foldPSubcellWidth must be finite, positive, and <= 0.05");
  }
  if (
    !Number.isFinite(foldPNeighborhoodRadius) ||
    foldPNeighborhoodRadius < 2 ||
    foldPNeighborhoodRadius > 8
  ) {
    throw new Error("foldPNeighborhoodRadius must be finite and in [2,8]");
  }

  const regularPredecessor =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate();
  const foldPairPredecessor =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledRootTubeCellCertificate();
  const foldRowsByCell = new Map(
    foldPairPredecessor.cell_cover_rows.map((row) => [row.cell_id, row])
  );
  const rows = regularPredecessor.regular_root_cell_rows.map((regularCell) => {
    const foldCell = foldRowsByCell.get(regularCell.cell_id);
    if (!foldCell) {
      throw new Error(`missing fold-pair cell ${regularCell.cell_id}`);
    }
    return buildCellRow({
      regularCell,
      foldCell,
      deltaSubcellWidth,
      foldPadding,
      foldPRootPadding,
      foldPSubcellWidth,
      foldPNeighborhoodRadius,
    });
  });
  const summary = summarizeRows({
    rows,
    regularPredecessor,
    foldPairPredecessor,
  });
  const passed =
    summary.status ===
    "directed-rounded-theta3minus-regular-root-complement-slab-exclusion-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_COMPLEMENT_SLAB_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.md",
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.md",
    complement_slab_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      speed_cell_count: regularPredecessor.cell_cover_parameters.speed_cell_count,
      y_cell_count: regularPredecessor.cell_cover_parameters.y_cell_count,
      y_interval_hull: [0, 0.115],
      delta_domain:
        "0 <= delta <= 2*nu+1e-8*nu on each certified speed cell",
      delta_subcell_width: formatSmallNumber(deltaSubcellWidth),
      fold_p_subcell_width: formatSmallNumber(foldPSubcellWidth),
      fold_p_neighborhood_radius: formatSmallNumber(foldPNeighborhoodRadius),
      regular_root_tube_source:
        "four named regular-root tubes from the regular-root cell certificate",
      fold_pair_root_tube_source:
        "two reserved -s_{+,+}(u+Q) fold-pair tubes mapped from delta_f+epsilon*beta*y+y^2*z and padded by foldPairRootPadding",
      fold_pair_root_padding: formatSmallNumber(foldPadding),
      fold_p_root_padding: formatSmallNumber(foldPRootPadding),
      exclusion_predicate:
        "outside the folded-source p-neighborhood, interval F(theta_tilde,delta;nu,kappa) has fixed nonzero sign; inside |p|<=foldPNeighborhoodRadius, the Taylor-cancelled scaled equation F/y^2 has fixed nonzero sign away from the two protected fold-pair p-root tubes",
    },
    regular_root_complement_slab_rows: rows,
    regular_root_complement_slab_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.regular-root-sheet-quotient-cell-cover",
        status: "directed-rounded cell-cover certified",
      },
      {
        row: "theta3minus.fold-pair-scaled-root-tube-cell-cover",
        status: "directed-rounded cell-cover certified",
      },
      {
        row: "theta3minus.regular-root-complement-slab-exclusion",
        status: passed
          ? "hybrid raw-F and scaled fold-p complement slabs certified"
          : "open",
      },
      {
        row: "theta3minus.regular-root-remainder-continuous-collar",
        status: passed
          ? "regular-root complement closed; blocked next by fold-pair G,D quotient"
          : "blocked by regular-root complement slab row",
      },
      {
        row: "theta3minus.fold-pair-GD-quotient-root-graph",
        status: "open",
      },
      {
        row: "theta3minus.left-fold-collar-full-remainder",
        status: "blocked by fold-pair quotient row",
      },
      {
        row: "I1.regular-critical-exhaustion",
        status: "blocked by theta3minus fold-pair quotient row",
      },
    ],
    artifact_claim: {
      receiver_normal_eom_evidence_status: "invalidated-by-receiver-normal-master-eom",
      receiver_normal_restart_required: true,
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_regular_root_sheet_quotient_cell_cover:
        regularPredecessor.artifact_claim
          .certifies_directed_rounded_regular_root_sheet_quotient_cell_cover,
      certifies_directed_rounded_regular_root_nonfold_and_outer_complement_slab_exclusion:
        passed,
      certifies_directed_rounded_regular_root_fold_neighborhood_scaled_p_exclusion:
        passed,
      certifies_directed_rounded_regular_root_complement_slab_exclusion: passed,
      certifies_directed_rounded_regular_root_remainder: passed,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded hybrid complement-slab exclusion for the regular-root side of the theta3minus collar: raw F certifies the three nonfold source terms and the folded-source exterior, while the Taylor-cancelled fold-p chart certifies the bounded folded-source neighborhood outside the two protected fold-pair p-root tubes. Fold-pair G,D quotient, full collar closure, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-GD-quotient-root-graph-certificate-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The regular-root complement is closed by a hybrid raw-F/scaled-p certificate. The remaining theta3minus collar burden is the fold-pair G,D quotient on the certified h-root graph.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_COMPLEMENT_SLAB_CERTIFICATE_SCHEMA,
    "schema must match theta3minus regular-root complement-slab certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus regular-root complement-slab certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.complement_slab_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "regular-root complement-slab certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.complement_slab_parameters?.speed_band === undefined &&
      artifact?.complement_slab_parameters?.speed_window === undefined &&
      artifact?.complement_slab_parameters?.speed_min === undefined &&
      artifact?.complement_slab_parameters?.speed_max === undefined,
    "complement-slab parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.regular_root_complement_slab_summary?.status ===
      "directed-rounded-theta3minus-regular-root-complement-slab-exclusion-certified" &&
      artifact?.regular_root_complement_slab_summary
        ?.all_attempted_raw_source_complement_slabs_certified === true &&
      artifact?.regular_root_complement_slab_summary
        ?.all_scaled_fold_p_slabs_certified === true &&
      artifact?.regular_root_complement_slab_summary
        ?.all_complement_slabs_certified === true &&
      artifact?.regular_root_complement_slab_summary
        ?.deferred_fold_neighborhood_slab_count === 0 &&
      Number(
        artifact?.regular_root_complement_slab_summary
          ?.min_complement_F_clearance
      ) > 0 &&
      Number(
        artifact?.regular_root_complement_slab_summary
          ?.min_scaled_fold_p_F_over_y2_clearance
      ) > 0 &&
      Number(
        artifact?.regular_root_complement_slab_summary?.max_delta_subcell_width
      ) <= 0.0021,
    "hybrid raw-F and scaled fold-p complement slabs must certify fixed nonzero signs",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_regular_root_sheet_quotient_cell_cover ===
      true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_regular_root_nonfold_and_outer_complement_slab_exclusion ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_regular_root_fold_neighborhood_scaled_p_exclusion ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_regular_root_complement_slab_exclusion ===
        true &&
      artifact?.artifact_claim?.certifies_directed_rounded_regular_root_remainder ===
        true &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must close the regular-root complement and keep fold-pair/full closure, I1, and retention open",
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
    } else if (arg === "--delta-subcell-width") {
      options.deltaSubcellWidth = argv[++index];
    } else if (arg === "--fold-p-subcell-width") {
      options.foldPSubcellWidth = argv[++index];
    } else if (arg === "--fold-p-neighborhood-radius") {
      options.foldPNeighborhoodRadius = argv[++index];
    } else if (arg === "--fold-p-root-padding") {
      options.foldPRootPadding = argv[++index];
    } else if (arg === "--fold-pair-root-padding") {
      options.foldPairRootPadding = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                     Write artifact JSON",
    "  --validate <path>                Validate artifact JSON",
    "  --schema                         Print schema id",
    "  --delta-subcell-width <value>     Maximum delta slab subcell width",
    "  --fold-p-subcell-width <value>    Maximum p-chart slab subcell width",
    "  --fold-p-neighborhood-radius <r>  Fold p-chart domain radius",
    "  --fold-p-root-padding <value>     Padding added to protected fold-p root collars",
    "  --fold-pair-root-padding <value>  Padding added to reserved fold-pair root tubes",
  ].join("\n");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.schema) {
    console.log(
      JSON.stringify(
        {
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_COMPLEMENT_SLAB_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate(
      artifact
    );
  if (errors.length > 0) {
    console.error(JSON.stringify({ valid: false, errors }, null, 2));
    process.exitCode = 1;
    return;
  }
  if (options.out) {
    fs.mkdirSync(path.dirname(options.out), { recursive: true });
    fs.writeFileSync(options.out, `${JSON.stringify(artifact, null, 2)}\n`);
  } else {
    console.log(JSON.stringify(artifact, null, 2));
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    console.error(usage());
    process.exitCode = 1;
  }
}
