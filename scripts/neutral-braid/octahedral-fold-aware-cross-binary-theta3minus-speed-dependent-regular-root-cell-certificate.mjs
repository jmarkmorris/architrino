#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_CELL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_regular_root_cell_certificate";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const DEFAULT_SPEED_CELL_COUNT = 16;
const DEFAULT_Y_CELL_COUNT = 64;
const DEFAULT_ROOT_PADDING = 0.00005;
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const QUARTER_PERIOD = Math.PI / 2;

const REGULAR_SHEETS = [
  {
    sheet_id: "spp_u_regular_0",
    term_label: "s_{+,+}(u)",
    selection: "root-index-0",
  },
  {
    sheet_id: "minus_spp_u_plus_Q_regular_outer",
    term_label: "-s_{+,+}(u+Q)",
    selection: "farthest-from-fold-delta",
  },
  {
    sheet_id: "smp_u_regular_0",
    term_label: "s_{-,+}(u)",
    selection: "root-index-0",
  },
  {
    sheet_id: "minus_smp_u_plus_Q_regular_0",
    term_label: "-s_{-,+}(u+Q)",
    selection: "root-index-0",
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

function pointInterval(value) {
  return outwardInterval([value, value]);
}

function intervalHull(values, pad = 0) {
  return outwardInterval([
    Math.min(...values) - pad,
    Math.max(...values) + pad,
  ]);
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

function definiteAbsoluteInterval(interval, expectedSign) {
  return expectedSign === "+" ? interval : scaleInterval(interval, -1);
}

function intervalAbsUpper(interval) {
  return Math.max(Math.abs(Number(interval[0])), Math.abs(Number(interval[1])));
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

function inverseSpeedInterval(speedRatioInterval) {
  return outwardInterval([1 / speedRatioInterval[1], 1 / speedRatioInterval[0]]);
}

function inverseSpeedSquaredInterval(speedRatioInterval) {
  return outwardInterval([
    1 / (speedRatioInterval[1] * speedRatioInterval[1]),
    1 / (speedRatioInterval[0] * speedRatioInterval[0]),
  ]);
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
    multiplyIntervals(
      scaleInterval(deltaInterval, 2),
      inverseSpeedSquaredInterval(speedRatioInterval)
    ),
    scaleInterval(cosInterval(phiInterval), -1),
    scaleInterval(cosInterval(deltaInterval), kappa)
  );
}

function sourceContributionValueAndDerivativeIntervals({
  speedRatioInterval,
  kappa,
  sigma,
  thetaTildeInterval,
  deltaInterval,
  FDeltaExpectedSign,
}) {
  const phiInterval = sourcePhiInterval({ thetaTildeInterval, deltaInterval });
  const sinPhi = sinInterval(phiInterval);
  const cosPhi = cosInterval(phiInterval);
  const sinDelta = sinInterval(deltaInterval);
  const cosDelta = cosInterval(deltaInterval);
  const FDelta = sourceDeltaDerivativeInterval({
    speedRatioInterval,
    kappa,
    thetaTildeInterval,
    deltaInterval,
  });
  const FDeltaSign = intervalSignAndClearance(FDelta);
  if (FDeltaSign.sign === "mixed" || FDeltaSign.sign !== FDeltaExpectedSign) {
    return {
      value_interval: [-Infinity, Infinity],
      derivative_interval: [-Infinity, Infinity],
      F_delta_interval: FDelta,
      F_delta_sign: FDeltaSign.sign,
      F_delta_clearance: 0,
    };
  }

  const signFDelta = FDeltaExpectedSign === "+" ? 1 : -1;
  const absFDelta = definiteAbsoluteInterval(FDelta, FDeltaExpectedSign);
  const B = scaleInterval(
    addIntervals(cosPhi, scaleInterval(cosDelta, kappa)),
    -0.5
  );
  const deltaSquared = positivePowerInterval(deltaInterval, 2);
  const inverseFactor = reciprocalInterval(
    multiplyIntervals(deltaSquared, absFDelta)
  );
  const valueInterval = multiplyIntervals(
    scaleInterval(multiplyIntervals(B, inverseFactor), 2 * sigma),
    inverseSpeedInterval(speedRatioInterval)
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
    scaleInterval(inverseSpeedSquaredInterval(speedRatioInterval), 2),
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
      multiplyIntervals(positivePowerInterval(deltaInterval, 3), absFDelta)
    ),
    divideIntervals(
      scaleInterval(FDeltaPrime, -signFDelta),
      multiplyIntervals(deltaSquared, positivePowerInterval(absFDelta, 2))
    )
  );
  const derivativeInterval = multiplyIntervals(
    scaleInterval(
      addIntervals(
        multiplyIntervals(BPrime, inverseFactor),
        multiplyIntervals(B, inverseFactorPrime)
      ),
      2 * sigma
    ),
    inverseSpeedInterval(speedRatioInterval)
  );

  return {
    value_interval: valueInterval,
    derivative_interval: derivativeInterval,
    F_delta_interval: FDelta,
    F_delta_sign: FDeltaSign.sign,
    F_delta_clearance: FDeltaSign.clearance,
  };
}

function makeSpeedBreaks(cellCount) {
  const count = Number.parseInt(cellCount, 10);
  if (!Number.isInteger(count) || count < 4 || count > 128) {
    throw new Error("speedCellCount must be an integer in [4,128]");
  }
  const [left, right] = SPEED_RATIO_ENCLOSURE;
  return Array.from({ length: count + 1 }, (_, index) =>
    left + ((right - left) * index) / count
  );
}

function makeYBreaks(cellCount) {
  const count = Number.parseInt(cellCount, 10);
  if (!Number.isInteger(count) || count < 8 || count > 256) {
    throw new Error("yCellCount must be an integer in [8,256]");
  }
  return Array.from({ length: count + 1 }, (_, index) => (0.115 * index) / count);
}

function termThetaTilde({ termLabel, theta }) {
  return termLabel.includes("u+Q") ? theta + QUARTER_PERIOD : theta;
}

function selectRegularRoot({ term, sheet, deltaFold }) {
  if (sheet.selection === "root-index-0") {
    return term.root_rows[0];
  }
  if (sheet.selection === "farthest-from-fold-delta") {
    return [...term.root_rows].sort(
      (left, right) =>
        Math.abs(Number(right.delta) - deltaFold) -
        Math.abs(Number(left.delta) - deltaFold)
    )[0];
  }
  throw new Error(`unknown regular sheet selection ${sheet.selection}`);
}

function evaluateCorner({ speedRatio, theta, deltaFold, rootSubdivisions }) {
  const evaluation = evaluateCrossBinaryForcingAndDerivativeAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
  return REGULAR_SHEETS.map((sheet) => {
    const term = evaluation.terms.find(
      (candidate) => candidate.term_label === sheet.term_label
    );
    if (!term) {
      throw new Error(`missing term ${sheet.term_label}`);
    }
    const root = selectRegularRoot({ term, sheet, deltaFold });
    if (!root) {
      throw new Error(`missing regular root for ${sheet.sheet_id}`);
    }
    return {
      ...sheet,
      coefficient: term.coefficient,
      kappa: term.kappa,
      sigma: term.sigma,
      term_root_count: term.root_count,
      theta_tilde: Number(term.theta_tilde_normalized),
      delta: Number(root.delta),
      F_delta: Number(root.F_delta),
    };
  });
}

function buildCornerRows({ speedValues, yValues, foldRows, rootSubdivisions }) {
  const rows = [];
  for (const speedIndex of [0, 1]) {
    const speedRatio = speedValues[speedIndex];
    const foldRow = foldRows[speedIndex];
    const thetaFold = Number(foldRow.theta_fold);
    const deltaFold = Number(foldRow.delta_fold);
    for (const y of yValues) {
      const theta = thetaFold - y * y;
      rows.push({
        speed_ratio: speedRatio,
        y,
        theta,
        theta_fold: thetaFold,
        delta_fold: deltaFold,
        sheets: evaluateCorner({
          speedRatio,
          theta,
          deltaFold,
          rootSubdivisions,
        }),
      });
    }
  }
  return rows;
}

function cellSheetRow({ sheet, cornerRows, speedRatioInterval, rootPadding }) {
  const cornerSheetRows = cornerRows.map((corner) =>
    corner.sheets.find((candidate) => candidate.sheet_id === sheet.sheet_id)
  );
  const deltaInterval = intervalHull(
    cornerSheetRows.map((row) => row.delta),
    rootPadding
  );
  const thetaTildeInterval = intervalHull(
    cornerSheetRows.map((row) => row.theta_tilde)
  );
  const expectedFDeltaSign =
    cornerSheetRows.reduce((sum, row) => sum + row.F_delta, 0) >= 0 ? "+" : "-";
  const FDelta = sourceDeltaDerivativeInterval({
    speedRatioInterval,
    kappa: cornerSheetRows[0].kappa,
    thetaTildeInterval,
    deltaInterval,
  });
  const FDeltaSign = intervalSignAndClearance(FDelta);
  const contribution = sourceContributionValueAndDerivativeIntervals({
    speedRatioInterval,
    kappa: cornerSheetRows[0].kappa,
    sigma: cornerSheetRows[0].sigma,
    thetaTildeInterval,
    deltaInterval,
    FDeltaExpectedSign: expectedFDeltaSign,
  });
  const leftF = sourceEquationInterval({
    speedRatioInterval,
    kappa: cornerSheetRows[0].kappa,
    thetaTildeInterval,
    deltaInterval: pointInterval(deltaInterval[0]),
  });
  const rightF = sourceEquationInterval({
    speedRatioInterval,
    kappa: cornerSheetRows[0].kappa,
    thetaTildeInterval,
    deltaInterval: pointInterval(deltaInterval[1]),
  });
  const leftSign = intervalSignAndClearance(leftF);
  const rightSign = intervalSignAndClearance(rightF);
  const expectedLeftSign = expectedFDeltaSign === "+" ? "-" : "+";
  const expectedRightSign = expectedFDeltaSign === "+" ? "+" : "-";
  const weightedValue = scaleInterval(
    contribution.value_interval,
    cornerSheetRows[0].coefficient
  );
  const weightedDerivative = scaleInterval(
    contribution.derivative_interval,
    cornerSheetRows[0].coefficient
  );
  return {
    sheet_id: sheet.sheet_id,
    term_label: sheet.term_label,
    selection: sheet.selection,
    term_coefficient: cornerSheetRows[0].coefficient,
    kappa: cornerSheetRows[0].kappa,
    sigma: cornerSheetRows[0].sigma,
    term_root_count_corner_signature: cornerSheetRows
      .map((row) => row.term_root_count)
      .join(","),
    theta_tilde_interval: formatInterval(thetaTildeInterval),
    delta_interval: formatInterval(deltaInterval),
    endpoint_rows: [
      {
        endpoint: "left",
        F_interval: formatInterval(leftF),
        F_sign: leftSign.sign,
        F_clearance: formatSmallNumber(leftSign.clearance),
      },
      {
        endpoint: "right",
        F_interval: formatInterval(rightF),
        F_sign: rightSign.sign,
        F_clearance: formatSmallNumber(rightSign.clearance),
      },
    ],
    endpoint_bracket_certified:
      leftSign.sign === expectedLeftSign && rightSign.sign === expectedRightSign,
    F_delta_interval: formatInterval(FDelta),
    F_delta_expected_sign: expectedFDeltaSign,
    F_delta_sign: FDeltaSign.sign,
    F_delta_clearance: formatSmallNumber(FDeltaSign.clearance),
    F_delta_sign_certified:
      FDeltaSign.sign !== "mixed" && FDeltaSign.sign === expectedFDeltaSign,
    value_interval: formatInterval(contribution.value_interval),
    derivative_interval: formatInterval(contribution.derivative_interval),
    weighted_value_interval: formatInterval(weightedValue),
    weighted_derivative_interval: formatInterval(weightedDerivative),
  };
}

function intervalRowForCell({
  speedIndex,
  yIndex,
  speedValues,
  yValues,
  foldRows,
  rootPadding,
  rootSubdivisions,
}) {
  const speedRatioInterval = outwardInterval(speedValues);
  const yInterval = outwardInterval(yValues);
  const cornerRows = buildCornerRows({
    speedValues,
    yValues,
    foldRows,
    rootSubdivisions,
  });
  const sheetRows = REGULAR_SHEETS.map((sheet) =>
    cellSheetRow({ sheet, cornerRows, speedRatioInterval, rootPadding })
  );
  const weightedValues = sheetRows.map((row) => row.weighted_value_interval);
  const weightedDerivatives = sheetRows.map(
    (row) => row.weighted_derivative_interval
  );
  const QGInterval = scaleInterval(addIntervals(...weightedValues), 2);
  const QDInterval = scaleInterval(addIntervals(...weightedDerivatives), 4);
  return {
    cell_id: `speed.${speedIndex}.y.${yIndex}`,
    speed_interval: formatInterval(speedRatioInterval),
    y_interval: formatInterval(yInterval),
    theta_fold_interval: formatInterval(
      intervalHull(cornerRows.map((corner) => corner.theta_fold))
    ),
    theta_interval: formatInterval(intervalHull(cornerRows.map((corner) => corner.theta))),
    delta_fold_interval: formatInterval(
      intervalHull(cornerRows.map((corner) => corner.delta_fold))
    ),
    root_padding: formatSmallNumber(rootPadding),
    regular_sheet_rows: sheetRows,
    regular_root_count: sheetRows.length,
    all_endpoint_brackets_certified: sheetRows.every(
      (row) => row.endpoint_bracket_certified
    ),
    all_F_delta_signs_certified: sheetRows.every(
      (row) => row.F_delta_sign_certified
    ),
    R_G_regular_over_y_interval: formatInterval(QGInterval),
    R_D_regular_over_y3_interval: formatInterval(QDInterval),
  };
}

function summarizeRows(rows, certifiedBudget) {
  const sheetRows = rows.flatMap((row) => row.regular_sheet_rows);
  const endpointRows = sheetRows.flatMap((row) => row.endpoint_rows);
  const minEndpointFClearance = Math.min(
    ...endpointRows.map((row) => Number(row.F_clearance))
  );
  const minFDeltaClearance = Math.min(
    ...sheetRows.map((row) => Number(row.F_delta_clearance))
  );
  const maxQG = Math.max(
    ...rows.map((row) => intervalAbsUpper(row.R_G_regular_over_y_interval))
  );
  const maxQD = Math.max(
    ...rows.map((row) => intervalAbsUpper(row.R_D_regular_over_y3_interval))
  );
  const allEndpointBracketsCertified = rows.every(
    (row) => row.all_endpoint_brackets_certified
  );
  const allFDeltaSignsCertified = rows.every(
    (row) => row.all_F_delta_signs_certified
  );
  const outerRadius = Math.max(
    ...rows.flatMap((row) => row.y_interval.map(Number))
  );
  const impliedRG = maxQG * outerRadius;
  const impliedRD = maxQD * outerRadius ** 3;
  const maxBudgetRatio = Math.max(impliedRG, impliedRD) / certifiedBudget;
  const passed =
    allEndpointBracketsCertified &&
    allFDeltaSignsCertified &&
    minEndpointFClearance > 0.00001 &&
    minFDeltaClearance > 0.55 &&
    maxQG < 0.09 &&
    maxQD < 0.62 &&
    maxBudgetRatio < 0.055;
  return {
    speed_cell_count: new Set(rows.map((row) => row.speed_interval.join(","))).size,
    y_cell_count: new Set(rows.map((row) => row.y_interval.join(","))).size,
    cell_count: rows.length,
    regular_sheet_cell_count: sheetRows.length,
    endpoint_interval_count: endpointRows.length,
    all_endpoint_brackets_certified: allEndpointBracketsCertified,
    all_F_delta_signs_certified: allFDeltaSignsCertified,
    min_endpoint_F_clearance: formatSmallNumber(minEndpointFClearance),
    min_F_delta_clearance: formatSmallNumber(minFDeltaClearance),
    max_abs_R_G_regular_over_y_interval_upper: formatSmallNumber(maxQG),
    max_abs_R_D_regular_over_y3_interval_upper: formatSmallNumber(maxQD),
    certified_budget_from_negative_L_upper: formatSmallNumber(certifiedBudget),
    implied_R_G_regular_budget_at_outer_radius: formatSmallNumber(impliedRG),
    implied_R_D_regular_budget_at_outer_radius: formatSmallNumber(impliedRD),
    max_regular_root_budget_ratio: formatSmallNumber(maxBudgetRatio),
    status: passed
      ? "directed-rounded-theta3minus-regular-root-cell-cover-certified"
      : "theta3minus-regular-root-cell-cover-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate(
  options = {}
) {
  const speedBreaks = makeSpeedBreaks(
    options.speedCellCount ?? DEFAULT_SPEED_CELL_COUNT
  );
  const yBreaks = makeYBreaks(options.yCellCount ?? DEFAULT_Y_CELL_COUNT);
  const rootPadding = Number(options.rootPadding ?? DEFAULT_ROOT_PADDING);
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isFinite(rootPadding) || rootPadding <= 0 || rootPadding > 0.001) {
    throw new Error("rootPadding must be finite, positive, and <= 0.001");
  }
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const normalForm =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      speedSamples: speedBreaks,
      ySamples: [0.115, 0.01, 0.001, 0.0005],
      rootSubdivisions,
    });
  const foldLimit =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate({
      rootSubdivisions,
      speedSamples: speedBreaks,
    });
  const predecessor =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate({
      rootSubdivisions,
    });
  const certifiedBudget = -Number(
    foldLimit.normal_form_theorem_progress.certified_L_upper_bound
  );
  const rows = [];
  for (let speedIndex = 0; speedIndex < speedBreaks.length - 1; speedIndex += 1) {
    const speedValues = [speedBreaks[speedIndex], speedBreaks[speedIndex + 1]];
    const foldRows = [
      normalForm.speed_dependent_fold_normal_form_rows[speedIndex],
      normalForm.speed_dependent_fold_normal_form_rows[speedIndex + 1],
    ];
    for (let yIndex = 0; yIndex < yBreaks.length - 1; yIndex += 1) {
      rows.push(
        intervalRowForCell({
          speedIndex,
          yIndex,
          speedValues,
          yValues: [yBreaks[yIndex], yBreaks[yIndex + 1]],
          foldRows,
          rootPadding,
          rootSubdivisions,
        })
      );
    }
  }
  const summary = summarizeRows(rows, certifiedBudget);
  const passed =
    summary.status ===
    "directed-rounded-theta3minus-regular-root-cell-cover-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_CELL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.md",
    cell_cover_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      speed_cell_count: speedBreaks.length - 1,
      y_cell_count: yBreaks.length - 1,
      y_interval_hull: [0, 0.115],
      root_padding: formatSmallNumber(rootPadding),
      root_subdivisions: rootSubdivisions,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      regular_sheet_definition:
        "the four nonfolded source sheets; the two roots nearest delta_f(nu) in -s_{+,+}(u+Q) remain reserved for the fold-pair scaled chart",
      quotient_definitions: {
        R_G_regular_over_y:
          "2*sum_j c_j*2*sigma_j*B_j/(nu*delta_j^2*|F_delta,j|)",
        R_D_regular_over_y3:
          "4*sum_j c_j*d_theta(2*sigma_j*B_j/(nu*delta_j^2*|F_delta,j|))",
      },
    },
    regular_root_cell_rows: rows,
    regular_root_cell_summary: summary,
    imported_sampled_node_summary:
      predecessor.sampled_node_regular_root_interval_summary,
    closure_burndown: [
      {
        row: "theta3minus.sampled-node-regular-root-interval",
        status: "directed-rounded sampled-node certified",
      },
      {
        row: "theta3minus.regular-root-sheet-quotient-cell-cover",
        status: passed ? "directed-rounded cell-cover certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "directed-rounded open",
      },
      {
        row: "theta3minus.regular-root-complement-slab-exclusion",
        status: "open",
      },
      {
        row: "theta3minus.left-fold-collar-full-remainder",
        status: "blocked by fold-pair quotient and complement-slab rows",
      },
      {
        row: "I1.regular-critical-exhaustion",
        status: "blocked by theta3minus remainder",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_regular_root_sheet_quotient_cell_cover: passed,
      certifies_directed_rounded_regular_root_remainder: false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded continuous speed/y cell cover for the four named regular-root sheet quotients. Fold-pair quotient closure, complement-slab exclusion, full collar closure, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-GD-quotient-root-graph-certificate-required",
      parallel_successor_row:
        "theta3minus.regular-root-complement-slab-exclusion-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The named regular source sheets now have directed-rounded speed/y cell brackets, fixed-sign F_delta intervals, and direct quotient bounds for R_G_regular/y and R_D_regular/y^3. This closes the sheet-quotient part but not the fold-pair quotient or global complement-slab exclusion.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_CELL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus regular-root cell certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus regular-root cell certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.cell_cover_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "regular-root cell certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.cell_cover_parameters?.speed_band === undefined &&
      artifact?.cell_cover_parameters?.speed_window === undefined &&
      artifact?.cell_cover_parameters?.speed_min === undefined &&
      artifact?.cell_cover_parameters?.speed_max === undefined,
    "cell-cover parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.regular_root_cell_summary?.status ===
      "directed-rounded-theta3minus-regular-root-cell-cover-certified" &&
      artifact?.regular_root_cell_summary?.all_endpoint_brackets_certified ===
        true &&
      artifact?.regular_root_cell_summary?.all_F_delta_signs_certified ===
        true &&
      Number(artifact?.regular_root_cell_summary?.min_endpoint_F_clearance) >
        0.00001 &&
      Number(artifact?.regular_root_cell_summary?.min_F_delta_clearance) >
        0.55 &&
      Number(
        artifact?.regular_root_cell_summary
          ?.max_abs_R_G_regular_over_y_interval_upper
      ) < 0.09 &&
      Number(
        artifact?.regular_root_cell_summary
          ?.max_abs_R_D_regular_over_y3_interval_upper
      ) < 0.62 &&
      Number(artifact?.regular_root_cell_summary?.max_regular_root_budget_ratio) <
        0.055,
    "regular-root cell rows must certify endpoint brackets, F_delta signs, and regular G/D quotient bounds",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_regular_root_sheet_quotient_cell_cover ===
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
    "artifact claim must keep full remainder, I1 closure, and retention open",
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
    } else if (arg === "--speed-cells") {
      options.speedCellCount = argv[++index];
    } else if (arg === "--y-cells") {
      options.yCellCount = argv[++index];
    } else if (arg === "--root-padding") {
      options.rootPadding = argv[++index];
    } else if (arg === "--root-subdivisions") {
      options.rootSubdivisions = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                  Write artifact JSON",
    "  --validate <path>             Validate an artifact JSON",
    "  --schema                      Print artifact schema metadata",
    "  --speed-cells <count>         Speed cell count inside [3.02156,3.02157]",
    "  --y-cells <count>             y cell count inside [0,0.115]",
    "  --root-padding <value>        Delta tube padding around corner-root hulls",
    "  --root-subdivisions <count>   Root subdivisions for point evaluator",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_CELL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate(
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
    return;
  }
  console.log(JSON.stringify(artifact, null, 2));
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
