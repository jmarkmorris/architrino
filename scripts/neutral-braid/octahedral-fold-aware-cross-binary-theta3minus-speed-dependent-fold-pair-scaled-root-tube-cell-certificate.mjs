#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_ROOT_TUBE_CELL_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_scaled_root_tube_cell_certificate";
const PROMOTION_STATUS = "priority-only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const DEFAULT_SPEED_CELL_COUNT = 16;
const DEFAULT_Y_CELL_COUNT = 64;
const DEFAULT_ROOT_SUBDIVISIONS = 100;
const DEFAULT_Y_BREAKS = Array.from(
  { length: DEFAULT_Y_CELL_COUNT + 1 },
  (_, index) => (0.115 * index) / DEFAULT_Y_CELL_COUNT
);
const BRANCH_TUBES = {
  "-": [-3.0, -2.6],
  "+": [-3.05, -2.85],
};
const BRANCH_H_TUBES = {
  "-": [0.8, 4.0],
  "+": [-2.2, 0.2],
};

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

function intervalAbsUpper([left, right]) {
  return Math.max(Math.abs(left), Math.abs(right));
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

function inverseSpeedSquaredInterval(speedRatioInterval) {
  return outwardInterval([
    1 / (speedRatioInterval[1] * speedRatioInterval[1]),
    1 / (speedRatioInterval[0] * speedRatioInterval[0]),
  ]);
}

function stableS3Interval(argumentInterval) {
  const maxAbs = intervalAbsUpper(argumentInterval);
  if (maxAbs > 0.8) {
    throw new Error("S3 Taylor interval is only configured for |t| <= 0.8");
  }
  const upper = -1 / 6 + (maxAbs * maxAbs) / 120 + maxAbs ** 6 / 362880;
  return outwardInterval([-1 / 6, upper]);
}

function stableC4Interval(argumentInterval) {
  const maxAbs = intervalAbsUpper(argumentInterval);
  if (maxAbs > 0.8) {
    throw new Error("C4 Taylor interval is only configured for |t| <= 0.8");
  }
  const lower =
    1 / 24 - (maxAbs * maxAbs) / 720 - maxAbs ** 6 / 3628800;
  return outwardInterval([lower, 1 / 24]);
}

function stableS5Interval(argumentInterval) {
  const maxAbs = intervalAbsUpper(argumentInterval);
  if (maxAbs > 0.8) {
    throw new Error("S5 Taylor interval is only configured for |t| <= 0.8");
  }
  const lower = 1 / 120 - (maxAbs * maxAbs) / 5040 - maxAbs ** 6 / 6227020800;
  return outwardInterval([lower, 1 / 120]);
}

function branchSign(branch) {
  return branch === "-" ? -1 : 1;
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

function validateYBreaks(yBreaks) {
  if (
    !Array.isArray(yBreaks) ||
    yBreaks.length < 3 ||
    yBreaks[0] !== 0 ||
    yBreaks.some((entry) => !Number.isFinite(entry) || entry < 0)
  ) {
    throw new Error("yBreaks must start at 0 and contain finite nonnegative values");
  }
  for (let index = 1; index < yBreaks.length; index += 1) {
    if (yBreaks[index] <= yBreaks[index - 1]) {
      throw new Error("yBreaks must be strictly increasing");
    }
  }
  if (Math.abs(yBreaks[yBreaks.length - 1] - 0.115) > 1e-14) {
    throw new Error("yBreaks must end at the outer collar radius 0.115");
  }
}

function foldCellFromEndpointRows({ leftRow, rightRow, speedInterval }) {
  const deltaInterval = intervalHull([
    Number(leftRow.delta_fold),
    Number(rightRow.delta_fold),
  ]);
  const phiInterval = intervalHull([
    Number(leftRow.phi_fold),
    Number(rightRow.phi_fold),
  ]);
  const fDeltaDeltaInterval = intervalHull([
    Number(leftRow.F_delta_delta),
    Number(rightRow.F_delta_delta),
  ]);
  const gammaValues = [leftRow, rightRow].map((row) => {
    const phi = Number(row.phi_fold);
    const delta = Number(row.delta_fold);
    const beta = Number(row.beta);
    const fThetaDelta = 2 * Math.sin(phi);
    const fDeltaDeltaDelta = Math.cos(phi) - Math.cos(delta);
    return (
      (fThetaDelta - (fDeltaDeltaDelta * beta * beta) / 6) /
      Number(row.F_delta_delta)
    );
  });
  return {
    speed_interval: speedInterval,
    delta_fold_interval: deltaInterval,
    phi_fold_interval: phiInterval,
    A_interval: scaleInterval(fDeltaDeltaInterval, 0.5),
    F_delta_delta_interval: fDeltaDeltaInterval,
    gamma_interval: intervalHull(gammaValues),
    beta_interval: intervalHull([
      Number(leftRow.beta),
      Number(rightRow.beta),
    ]),
    sin_phi_interval: sinInterval(phiInterval),
    cos_phi_interval: cosInterval(phiInterval),
    sin_delta_interval: sinInterval(deltaInterval),
    cos_delta_interval: cosInterval(deltaInterval),
  };
}

function branchTInterval({ yInterval, xInterval, aInterval, sInterval }) {
  const polynomial = scaleInterval(
    addIntervals(
      scaleInterval(multiplyIntervals(positivePowerInterval(sInterval, 2), aInterval), 3),
      scaleInterval(
        multiplyIntervals(sInterval, yInterval, positivePowerInterval(aInterval, 2)),
        3
      ),
      multiplyIntervals(positivePowerInterval(yInterval, 2), positivePowerInterval(aInterval, 3))
    ),
    -1 / 6
  );
  const yx = multiplyIntervals(yInterval, xInterval);
  return addIntervals(
    polynomial,
    multiplyIntervals(
      yInterval,
      positivePowerInterval(xInterval, 5),
      stableS5Interval(yx)
    )
  );
}

function branchHInterval({ cell, yInterval, hInterval, sign }) {
  const s = scaleInterval(cell.beta_interval, sign);
  const z = addIntervals(cell.gamma_interval, multiplyIntervals(yInterval, hInterval));
  const aR = z;
  const aQ = addIntervals(z, [2, 2]);
  const r = addIntervals(s, multiplyIntervals(yInterval, aR));
  const q = addIntervals(s, multiplyIntervals(yInterval, aQ));
  const yq = multiplyIntervals(yInterval, q);
  const yr = multiplyIntervals(yInterval, r);
  const tq = branchTInterval({
    yInterval,
    xInterval: q,
    aInterval: aQ,
    sInterval: s,
  });
  const tr = branchTInterval({
    yInterval,
    xInterval: r,
    aInterval: aR,
    sInterval: s,
  });
  return addIntervals(
    scaleInterval(multiplyIntervals(cell.A_interval, s, hInterval), 2),
    multiplyIntervals(cell.A_interval, positivePowerInterval(z, 2)),
    scaleInterval(multiplyIntervals(cell.sin_phi_interval, addIntervals(z, [1, 1])), -2),
    multiplyIntervals(
      cell.sin_phi_interval,
      positivePowerInterval(q, 4),
      stableC4Interval(yq)
    ),
    multiplyIntervals(
      cell.sin_delta_interval,
      positivePowerInterval(r, 4),
      stableC4Interval(yr)
    ),
    scaleInterval(multiplyIntervals(cell.cos_phi_interval, tq), -1),
    multiplyIntervals(cell.cos_delta_interval, tr)
  );
}

function branchRInterval({ betaInterval, yInterval, zInterval, sign }) {
  return addIntervals(
    scaleInterval(betaInterval, sign),
    multiplyIntervals(yInterval, zInterval)
  );
}

function branchQInterval({ betaInterval, yInterval, zInterval, sign }) {
  return addIntervals(
    branchRInterval({ betaInterval, yInterval, zInterval, sign }),
    scaleInterval(yInterval, 2)
  );
}

function scaledKEndpointInterval({ cell, yInterval, z, sign }) {
  const zInterval = pointInterval(z);
  const r = branchRInterval({
    betaInterval: cell.beta_interval,
    yInterval,
    zInterval,
    sign,
  });
  const q = addIntervals(r, scaleInterval(yInterval, 2));
  const yq = multiplyIntervals(yInterval, q);
  const yr = multiplyIntervals(yInterval, r);
  return addIntervals(
    scaleInterval(
      multiplyIntervals(cell.A_interval, cell.beta_interval, zInterval),
      2 * sign
    ),
    multiplyIntervals(yInterval, cell.A_interval, positivePowerInterval(zInterval, 2)),
    scaleInterval(multiplyIntervals(cell.sin_phi_interval, r), -2),
    scaleInterval(multiplyIntervals(cell.sin_phi_interval, yInterval), -2),
    multiplyIntervals(
      yInterval,
      cell.sin_phi_interval,
      positivePowerInterval(q, 4),
      stableC4Interval(yq)
    ),
    multiplyIntervals(
      yInterval,
      cell.sin_delta_interval,
      positivePowerInterval(r, 4),
      stableC4Interval(yr)
    ),
    scaleInterval(
      multiplyIntervals(
        cell.cos_phi_interval,
        positivePowerInterval(q, 3),
        stableS3Interval(yq)
      ),
      -1
    ),
    multiplyIntervals(
      cell.cos_delta_interval,
      positivePowerInterval(r, 3),
      stableS3Interval(yr)
    )
  );
}

function scaledJInterval({ cell, yInterval, zInterval, sign }) {
  const r = branchRInterval({
    betaInterval: cell.beta_interval,
    yInterval,
    zInterval,
    sign,
  });
  const q = branchQInterval({
    betaInterval: cell.beta_interval,
    yInterval,
    zInterval,
    sign,
  });
  const yq = multiplyIntervals(yInterval, q);
  const yr = multiplyIntervals(yInterval, r);
  const inverseSpeedSquared = inverseSpeedSquaredInterval(cell.speed_interval);
  return addIntervals(
    multiplyIntervals(scaleInterval(r, 2), inverseSpeedSquared),
    scaleInterval(multiplyIntervals(cell.sin_phi_interval, q), -1),
    scaleInterval(multiplyIntervals(cell.sin_delta_interval, r), -1),
    multiplyIntervals(
      yInterval,
      addIntervals(
        scaleInterval(
          multiplyIntervals(cell.cos_phi_interval, positivePowerInterval(q, 2)),
          0.5
        ),
        scaleInterval(
          multiplyIntervals(cell.cos_delta_interval, positivePowerInterval(r, 2)),
          -0.5
        )
      )
    ),
    multiplyIntervals(
      positivePowerInterval(yInterval, 2),
      addIntervals(
        scaleInterval(
          multiplyIntervals(
            cell.sin_phi_interval,
            positivePowerInterval(q, 3),
            stableS3Interval(yq)
          ),
          -1
        ),
        scaleInterval(
          multiplyIntervals(
            cell.sin_delta_interval,
            positivePowerInterval(r, 3),
            stableS3Interval(yr)
          ),
          -1
        )
      )
    ),
    multiplyIntervals(
      positivePowerInterval(yInterval, 3),
      addIntervals(
        scaleInterval(
          multiplyIntervals(
            cell.cos_phi_interval,
            positivePowerInterval(q, 4),
            stableC4Interval(yq)
          ),
          -1
        ),
        multiplyIntervals(
          cell.cos_delta_interval,
          positivePowerInterval(r, 4),
          stableC4Interval(yr)
        )
      )
    )
  );
}

function intervalRowForCell({ speedIndex, yIndex, speedInterval, yInterval, leftRow, rightRow }) {
  const cell = foldCellFromEndpointRows({ leftRow, rightRow, speedInterval });
  const branchRows = Object.entries(BRANCH_TUBES).map(([branch, zTube]) => {
    const sign = branchSign(branch);
    const leftK = scaledKEndpointInterval({
      cell,
      yInterval,
      z: zTube[0],
      sign,
    });
    const rightK = scaledKEndpointInterval({
      cell,
      yInterval,
      z: zTube[1],
      sign,
    });
    const jInterval = scaledJInterval({
      cell,
      yInterval,
      zInterval: zTube,
      sign,
    });
    const leftSign = intervalSignAndClearance(leftK);
    const rightSign = intervalSignAndClearance(rightK);
    const jSign = intervalSignAndClearance(jInterval);
    const expectedLeftSign = branch === "-" ? "-" : "+";
    const expectedRightSign = branch === "-" ? "+" : "-";
    const expectedJSign = branch === "-" ? "+" : "-";
    return {
      branch,
      z_tube: formatInterval(zTube),
      h_tube: formatInterval(BRANCH_H_TUBES[branch]),
      K_left_endpoint_interval: formatInterval(leftK),
      K_left_endpoint_sign: leftSign.sign,
      K_left_endpoint_clearance: formatSmallNumber(leftSign.clearance),
      K_right_endpoint_interval: formatInterval(rightK),
      K_right_endpoint_sign: rightSign.sign,
      K_right_endpoint_clearance: formatSmallNumber(rightSign.clearance),
      J_interval: formatInterval(jInterval),
      J_sign: jSign.sign,
      J_clearance: formatSmallNumber(jSign.clearance),
      root_tube_certified:
        leftSign.sign === expectedLeftSign &&
        rightSign.sign === expectedRightSign,
      J_sign_certified: jSign.sign === expectedJSign,
    };
  });
  const hBranchRows = Object.entries(BRANCH_H_TUBES).map(([branch, hTube]) => {
    const sign = branchSign(branch);
    const hLeft = branchHInterval({
      cell,
      yInterval,
      hInterval: pointInterval(hTube[0]),
      sign,
    });
    const hRight = branchHInterval({
      cell,
      yInterval,
      hInterval: pointInterval(hTube[1]),
      sign,
    });
    const zInterval = addIntervals(
      cell.gamma_interval,
      multiplyIntervals(yInterval, hTube)
    );
    const jInterval = scaledJInterval({
      cell,
      yInterval,
      zInterval,
      sign,
    });
    const leftSign = intervalSignAndClearance(hLeft);
    const rightSign = intervalSignAndClearance(hRight);
    const jSign = intervalSignAndClearance(jInterval);
    const expectedLeftSign = branch === "-" ? "-" : "+";
    const expectedRightSign = branch === "-" ? "+" : "-";
    const expectedJSign = branch === "-" ? "+" : "-";
    return {
      branch,
      h_tube: formatInterval(hTube),
      z_image_interval: formatInterval(zInterval),
      H_left_endpoint_interval: formatInterval(hLeft),
      H_left_endpoint_sign: leftSign.sign,
      H_left_endpoint_clearance: formatSmallNumber(leftSign.clearance),
      H_right_endpoint_interval: formatInterval(hRight),
      H_right_endpoint_sign: rightSign.sign,
      H_right_endpoint_clearance: formatSmallNumber(rightSign.clearance),
      J_interval: formatInterval(jInterval),
      J_sign: jSign.sign,
      J_clearance: formatSmallNumber(jSign.clearance),
      h_root_graph_certified:
        leftSign.sign === expectedLeftSign &&
        rightSign.sign === expectedRightSign,
      h_J_sign_certified: jSign.sign === expectedJSign,
    };
  });
  const maxTaylorArgumentAbs = Math.max(
    ...branchRows.flatMap((branchRow) => {
      const zValues = branchRow.z_tube.map(Number);
      return zValues.flatMap((z) => {
        const sign = branchSign(branchRow.branch);
        const r = branchRInterval({
          betaInterval: cell.beta_interval,
          yInterval,
          zInterval: pointInterval(z),
          sign,
        });
        const q = addIntervals(r, scaleInterval(yInterval, 2));
        return [
          intervalAbsUpper(multiplyIntervals(yInterval, r)),
          intervalAbsUpper(multiplyIntervals(yInterval, q)),
        ];
      });
    })
  );
  return {
    cell_id: `speed.${speedIndex}.y.${yIndex}`,
    speed_interval: formatInterval(speedInterval),
    y_interval: formatInterval(yInterval),
    delta_fold_interval: formatInterval(cell.delta_fold_interval),
    phi_fold_interval: formatInterval(cell.phi_fold_interval),
    beta_interval: formatInterval(cell.beta_interval),
    gamma_interval: formatInterval(cell.gamma_interval),
    A_interval: formatInterval(cell.A_interval),
    F_delta_delta_interval: formatInterval(cell.F_delta_delta_interval),
    max_abs_taylor_argument: formatSmallNumber(maxTaylorArgumentAbs),
    branch_cell_rows: branchRows,
    h_root_graph_branch_rows: hBranchRows,
    all_root_tubes_certified: branchRows.every((row) => row.root_tube_certified),
    all_J_signs_certified: branchRows.every((row) => row.J_sign_certified),
    all_h_root_graphs_certified: hBranchRows.every(
      (row) => row.h_root_graph_certified
    ),
    all_h_J_signs_certified: hBranchRows.every(
      (row) => row.h_J_sign_certified
    ),
  };
}

function summarizeRows(rows) {
  const branchRows = rows.flatMap((row) => row.branch_cell_rows);
  const hBranchRows = rows.flatMap((row) => row.h_root_graph_branch_rows);
  const minKClearance = Math.min(
    ...branchRows.flatMap((row) => [
      Number(row.K_left_endpoint_clearance),
      Number(row.K_right_endpoint_clearance),
    ])
  );
  const minJClearance = Math.min(
    ...branchRows.map((row) => Number(row.J_clearance))
  );
  const minHClearance = Math.min(
    ...hBranchRows.flatMap((row) => [
      Number(row.H_left_endpoint_clearance),
      Number(row.H_right_endpoint_clearance),
    ])
  );
  const minHJClearance = Math.min(
    ...hBranchRows.map((row) => Number(row.J_clearance))
  );
  const maxTaylorArgumentAbs = Math.max(
    ...rows.map((row) => Number(row.max_abs_taylor_argument))
  );
  const allRootTubesCertified = rows.every((row) => row.all_root_tubes_certified);
  const allJSignsCertified = rows.every((row) => row.all_J_signs_certified);
  const allHRootGraphsCertified = rows.every(
    (row) => row.all_h_root_graphs_certified
  );
  const allHJSignsCertified = rows.every((row) => row.all_h_J_signs_certified);
  const passed =
    allRootTubesCertified &&
    allJSignsCertified &&
    allHRootGraphsCertified &&
    allHJSignsCertified &&
    minKClearance > 0.001 &&
    minJClearance > 0.7 &&
    minHClearance > 0.1 &&
    minHJClearance > 0.7 &&
    maxTaylorArgumentAbs < 0.8;
  return {
    speed_cell_count: new Set(rows.map((row) => row.speed_interval.join(","))).size,
    y_cell_count: new Set(rows.map((row) => row.y_interval.join(","))).size,
    cell_count: rows.length,
    branch_cell_count: branchRows.length,
    K_endpoint_count: branchRows.length * 2,
    H_endpoint_count: hBranchRows.length * 2,
    all_root_tubes_certified: allRootTubesCertified,
    all_J_signs_certified: allJSignsCertified,
    all_h_root_graphs_certified: allHRootGraphsCertified,
    all_h_J_signs_certified: allHJSignsCertified,
    min_K_endpoint_clearance: formatSmallNumber(minKClearance),
    min_J_clearance: formatSmallNumber(minJClearance),
    min_H_endpoint_clearance: formatSmallNumber(minHClearance),
    min_H_J_clearance: formatSmallNumber(minHJClearance),
    max_abs_taylor_argument: formatSmallNumber(maxTaylorArgumentAbs),
    status: passed
      ? "directed-rounded-theta3minus-fold-pair-scaled-root-tube-cell-cover-certified"
      : "theta3minus-fold-pair-scaled-root-tube-cell-cover-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledRootTubeCellCertificate(
  options = {}
) {
  const speedBreaks = makeSpeedBreaks(
    options.speedCellCount ?? DEFAULT_SPEED_CELL_COUNT
  );
  const yBreaks = parseNumberList(options.yBreaks, DEFAULT_Y_BREAKS);
  validateYBreaks(yBreaks);
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }

  const normalForm =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
      speedSamples: speedBreaks,
      ySamples: [0.115, 0.01, 0.001, 0.0005],
      rootSubdivisions,
    });
  const foldRows = normalForm.speed_dependent_fold_normal_form_rows;
  const rows = [];
  for (let speedIndex = 0; speedIndex < speedBreaks.length - 1; speedIndex += 1) {
    const speedInterval = outwardInterval([
      speedBreaks[speedIndex],
      speedBreaks[speedIndex + 1],
    ]);
    for (let yIndex = 0; yIndex < yBreaks.length - 1; yIndex += 1) {
      rows.push(
        intervalRowForCell({
          speedIndex,
          yIndex,
          speedInterval,
          yInterval: outwardInterval([yBreaks[yIndex], yBreaks[yIndex + 1]]),
          leftRow: foldRows[speedIndex],
          rightRow: foldRows[speedIndex + 1],
        })
      );
    }
  }
  const summary = summarizeRows(rows);
  const passed =
    summary.status ===
    "directed-rounded-theta3minus-fold-pair-scaled-root-tube-cell-cover-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_ROOT_TUBE_CELL_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md",
    cell_cover_parameters: {
      receiver_label: "1+",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      speed_cell_count: speedBreaks.length - 1,
      speed_ratio_cells: speedBreaks.map(formatSmallNumber),
      y_interval_hull: [0, 0.115],
      y_breaks: yBreaks.map(formatSmallNumber),
      branch_z_tubes: BRANCH_TUBES,
      branch_h_tubes: BRANCH_H_TUBES,
      moving_fold_chart: "theta=theta_3minus(nu)-y^2",
      scaled_equation:
        "K_epsilon=F(theta_tilde_f(nu)-y^2,delta_f(nu)+epsilon beta(nu)y+y^2z;nu,+1)/y^3 evaluated by Taylor-cancelled C4/S3 intervals",
      h_root_graph_equation:
        "z_epsilon=gamma(nu)+y*h_epsilon and H_epsilon=(K_epsilon(y,gamma+yh,nu)-K_epsilon(0,gamma,nu))/y evaluated by Taylor-cancelled S5/C4 intervals",
      root_subdivisions_for_fold_rows: rootSubdivisions,
      sampled_node_scope:
        "finite speed/y cell cover with endpoint-hull fold constants; not full speed-dependent normal-form remainder closure",
    },
    cell_cover_rows: rows,
    cell_cover_summary: summary,
    closure_burndown: [
      {
        row: "theta3minus.sampled-node-fold-pair-scaled-interval",
        status: "directed-rounded-sampled-node-certified",
      },
      {
        row: "theta3minus.fold-pair-scaled-root-tube-cell-cover",
        status: passed ? "directed-rounded-cell-cover-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-h-root-graph-cell-cover",
        status: passed ? "directed-rounded-cell-cover-certified" : "open",
      },
      {
        row: "theta3minus.fold-pair-scaled-remainder-continuous-collar",
        status: "directed-rounded-open",
      },
      {
        row: "theta3minus.regular-root-remainder-continuous-collar",
        status: "directed-rounded-open",
      },
      {
        row: "I1.regular-critical-exhaustion",
        status: "blocked-by-theta3minus-remainder",
      },
      {
        row: "representative-cross-binary-retention",
        status: "open",
      },
    ],
    artifact_claim: {
      receiver_normal_eom_evidence_status: "invalidated-by-receiver-normal-master-eom",
      receiver_normal_restart_required: true,
      assumes_fixed_speed_window: false,
      certifies_directed_rounded_fold_pair_scaled_root_tube_cell_cover: passed,
      certifies_directed_rounded_fold_pair_J_sign_cell_cover: passed,
      certifies_directed_rounded_fold_pair_h_root_graph_cell_cover: passed,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_directed_rounded_regular_root_remainder: false,
      certifies_directed_rounded_speed_dependent_fold_normal_form_remainder:
        false,
      certifies_theta_3minus_left_fold_collar_interval_radius: false,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      retained_branch: false,
      claim_level:
        "Directed-rounded finite speed/y cell-cover certificate for the coalescing fold-pair scaled root tubes, h-coordinate root graph, and J signs only. Fold-pair G,D remainder, regular-root remainder, full collar closure, I1 closure, quadrature, and retained branch status remain open.",
    },
    result: {
      theory_status: summary.status,
      first_successor_row:
        "theta3minus.fold-pair-scaled-remainder-continuous-collar-directed-rounded-required",
      parallel_successor_row:
        "theta3minus.regular-root-remainder-continuous-collar-directed-rounded-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The fold-pair root geometry is now covered by Taylor-cancelled K_sigma endpoint signs, H_sigma endpoint signs, and J_sigma signs on finite speed/y cells; this removes the root-graph contraction gap without closing the pair G,D remainder row.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledRootTubeCellCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_ROOT_TUBE_CELL_CERTIFICATE_SCHEMA,
    "schema must match theta3minus fold-pair scaled root-tube cell certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair scaled root-tube cell certificate packet",
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
    "cell-cover certificate must not impose a fixed speed window",
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
    artifact?.cell_cover_summary?.status ===
      "directed-rounded-theta3minus-fold-pair-scaled-root-tube-cell-cover-certified" &&
      artifact?.cell_cover_summary?.all_root_tubes_certified === true &&
      artifact?.cell_cover_summary?.all_J_signs_certified === true &&
      Number(artifact?.cell_cover_summary?.min_K_endpoint_clearance) > 0.001 &&
      Number(artifact?.cell_cover_summary?.min_J_clearance) > 0.7 &&
      artifact?.cell_cover_summary?.all_h_root_graphs_certified === true &&
      artifact?.cell_cover_summary?.all_h_J_signs_certified === true &&
      Number(artifact?.cell_cover_summary?.min_H_endpoint_clearance) > 0.1 &&
      Number(artifact?.cell_cover_summary?.min_H_J_clearance) > 0.7 &&
      Number(artifact?.cell_cover_summary?.max_abs_taylor_argument) < 0.8,
    "cell-cover rows must certify K endpoint signs, H endpoint signs, J signs, and Taylor argument bounds",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_directed_rounded_fold_pair_scaled_root_tube_cell_cover ===
      true &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_J_sign_cell_cover ===
        true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_h_root_graph_cell_cover ===
        true &&
      artifact?.artifact_claim?.certifies_directed_rounded_fold_pair_scaled_remainder ===
        false &&
      artifact?.artifact_claim?.certifies_directed_rounded_regular_root_remainder ===
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

export const theta3minusFoldPairScaledRootTubeCellInternals = {
  SPEED_RATIO_ENCLOSURE,
  DEFAULT_SPEED_CELL_COUNT,
  DEFAULT_Y_CELL_COUNT,
  DEFAULT_ROOT_SUBDIVISIONS,
  DEFAULT_Y_BREAKS,
  BRANCH_TUBES,
  BRANCH_H_TUBES,
  formatSmallNumber,
  formatInterval,
  nextUp,
  nextDown,
  outwardInterval,
  pointInterval,
  intervalHull,
  scaleInterval,
  addIntervals,
  subtractIntervals,
  multiplyTwoIntervals,
  multiplyIntervals,
  reciprocalInterval,
  divideIntervals,
  positivePowerInterval,
  intervalAbsUpper,
  intervalSignAndClearance,
  sinInterval,
  cosInterval,
  inverseSpeedSquaredInterval,
  stableS3Interval,
  stableC4Interval,
  stableS5Interval,
  branchSign,
  makeSpeedBreaks,
  parseNumberList,
  validateYBreaks,
  foldCellFromEndpointRows,
  branchTInterval,
  branchHInterval,
  branchRInterval,
  branchQInterval,
  scaledKEndpointInterval,
  scaledJInterval,
};

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
    } else if (arg === "--speed-cell-count") {
      options.speedCellCount = argv[++index];
    } else if (arg === "--y-breaks") {
      options.yBreaks = argv[++index];
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
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs [options]",
    "",
    "Options:",
    "  --out <path>                  Write artifact JSON",
    "  --validate <path>             Validate an artifact JSON",
    "  --schema                      Print artifact schema metadata",
    "  --speed-cell-count <count>    Number of speed cells covering [3.02156,3.02157]",
    "  --y-breaks <csv>              Increasing y-cell breakpoints from 0 to 0.115",
    "  --root-subdivisions <count>   Root subdivisions passed to the normal-form predecessor",
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
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_ROOT_TUBE_CELL_CERTIFICATE_SCHEMA,
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
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledRootTubeCellCertificate(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  const artifact =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledRootTubeCellCertificate(
      options
    );
  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledRootTubeCellCertificate(
      artifact
    );
  if (errors.length > 0) {
    console.error(JSON.stringify({ valid: false, errors }, null, 2));
    process.exitCode = 1;
    return;
  }
  const output = `${JSON.stringify(artifact, null, 2)}\n`;
  if (options.out) {
    fs.mkdirSync(path.dirname(options.out), { recursive: true });
    fs.writeFileSync(options.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
